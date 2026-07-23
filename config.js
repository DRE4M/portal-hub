/**
 * Hub Portal Service Configuration
 * OCI IP 및 포트 기반 서비스 링크 설정
 */
const PORTAL_CONFIG = {
  defaultOciIp: "129.225.197.60",
  title: "Dev Workspace Portal",
  subtitle: "Oracle Cloud Infrastructure & Microservices Hub",

  // 서브패스 대신 포트 기반(예: :3000, :8002) 직통 연결 사용
  useSubpathRouting: false,

  services: [
    {
      id: "oci-main",
      title: "OCI Main Server",
      category: "Infrastructure",
      icon: "🌐",
      description: "Oracle Cloud 인프라 메인 웹 서버 및 관리 도구",
      port: 80,
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
      protocol: "http",
      badge: "Game",
      badgeColor: "purple",
      tags: ["Nuxt.js", "FastAPI", "Vue3"]
    },
    {
      id: "fastapi-lab",
      title: "FastAPI Lab",
      category: "Backend API",
      icon: "⚡",
      description: "FastAPI 비동기 백엔드 연습 및 API 서버",
      port: 8002,
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
