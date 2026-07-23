/**
 * Hub Portal Service Configuration
 * OCI IP 및 Nginx 서브패스 기반으로 포트/경로를 손쉽게 변경할 수 있습니다.
 */
const PORTAL_CONFIG = {
  defaultOciIp: "129.225.197.60",
  title: "Dev Workspace Portal",
  subtitle: "Oracle Cloud Infrastructure & Microservices Hub",

  // 서브패스(예: /pokemantle, /fastapi) 라우팅 사용 여부
  useSubpathRouting: true,

  services: [
    {
      id: "oci-main",
      title: "OCI Main Server",
      category: "Infrastructure",
      icon: "🌐",
      description: "Oracle Cloud 인프라 메인 웹 서버 및 관리 도구",
      port: 80,
      path: "/",
      protocol: "http",
      badge: "Active",
      badgeColor: "cyan",
      tags: ["OCI", "Cloud", "Ubuntu"]
    },
    {
      id: "pokemantle",
      title: "Pokémantle Game",
      category: "Web App",
      icon: "🎮",
      description: "오늘의 포켓몬 맞추기 추리 게임 (Date/Puzzle 오버라이드 지원)",
      port: 3000,
      path: "/pokemantle/",
      protocol: "http",
      badge: "Game",
      badgeColor: "purple",
      tags: ["Nuxt.js", "FastAPI", "Vue3"]
    },
    {
      id: "fastapi-lab",
      title: "FastAPI Playground",
      category: "Backend API",
      icon: "⚡",
      description: "FastAPI 비동기 백엔드 연습 및 API 서버",
      port: 8002,
      path: "/fastapi/",
      protocol: "http",
      badge: "Dev API",
      badgeColor: "emerald",
      tags: ["Python", "FastAPI", "Uvicorn"]
    },
    {
      id: "add-service",
      title: "New Service Placeholder",
      category: "Expansion",
      icon: "🚀",
      description: "추가될 새로운 도커 마이크로서비스 또는 웹 프로젝트",
      port: null,
      path: null,
      protocol: "http",
      badge: "Coming Soon",
      badgeColor: "gray",
      tags: ["Docker", "Microservice"],
      disabled: true
    }
  ]
};

if (typeof window !== "undefined") {
  window.PORTAL_CONFIG = PORTAL_CONFIG;
}
