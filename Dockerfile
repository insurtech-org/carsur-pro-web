# ---- Builder: 사내 Base 재사용 ----
    FROM 699475927546.dkr.ecr.ap-northeast-2.amazonaws.com/insurtech-front-dev-base:latest AS builder
    
    WORKDIR /app
        
    # 환경 선택 (예: --build-arg BUILD_ENV=dev)
    ARG BUILD_ENV
    ENV BUILD_ENV=$BUILD_ENV

    # base 이미지의 node_modules 복사
    COPY package*.json ./
    RUN npm install
    
    # 빌드 타임에 필요한 환경파일 주입
    # ⚠️ 여기에 들어가는 값은 "NEXT_PUBLIC_*" 처럼 클라이언트에 노출 가능한 값만 두세요.
    #    서버 비밀(키/토큰/DB 등)은 이미지에 넣지 말고, 런타임에 K8s Secret/Env로 주입하세요.
    COPY ./envs/env-$BUILD_ENV .env
    
    # 프로젝트 소스 복사
    COPY . .
    
    # Next.js 빌드 (standalone 산출물 생성)
    RUN npm run build
    
    # ---- Runner: 얇은 Node 런타임 ----
    FROM node:20-alpine AS final
    WORKDIR /app
    
    # nginx 설치
    RUN apk add --no-cache nginx

    # swc(Next) 실행에 필요한 호환 패키지
    RUN apk add --no-cache libc6-compat

    # nginx 설정 복사
    COPY default.conf /etc/nginx/nginx.conf

    # 런타임에 필요한 최소 파일만 복사
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public

    # 환경 변수 설정
    ENV NODE_ENV=production
    ENV PORT=3000
    ENV HOSTNAME="0.0.0.0"

    # 시작 스크립트 생성
    RUN printf '#!/bin/sh\nnginx -g "daemon off;" &\nnode server.js\n' > /app/start.sh && \
        chmod +x /app/start.sh

    EXPOSE 80 3000
    CMD ["/app/start.sh"]