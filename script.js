document.addEventListener("DOMContentLoaded", () => {
  const config = window.PORTAL_CONFIG || {
    defaultOciIp: "129.225.197.60",
    title: "Dev Workspace Portal",
    subtitle: "Oracle Cloud Infrastructure & Microservices Hub",
    services: []
  };

  const cardsGrid = document.getElementById("cards-grid");

  // 현재 브라우저가 접속한 호스트명 자동 감지 (예: yeardayhour.duckdns.org, 129.225.197.60, localhost 등)
  let currentHost = window.location.hostname;
  
  // 탐색기에서 file:// 로 직접 열었을 경우 로컬 테스트용 localhost로 기본 자동 지정
  if (!currentHost || currentHost === "" || currentHost === "null" || window.location.protocol === "file:") {
    currentHost = "localhost";
  }

  const currentHostDisplay = document.getElementById("current-host-display");
  if (currentHostDisplay) {
    currentHostDisplay.innerText = currentHost;
  }

  // 카드 렌더링 함수
  function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = "";

    config.services.forEach((service) => {
      const fullUrl = service.port
        ? `${service.protocol}://${currentHost}:${service.port}`
        : `${service.protocol}://${currentHost}`;

      const card = document.createElement("a");
      card.className = `service-card ${service.disabled ? "disabled" : ""}`;
      if (!service.disabled) {
        card.href = fullUrl;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }

      card.innerHTML = `
        <div>
          <div class="card-header">
            <div class="card-icon">${service.icon || "💻"}</div>
            <span class="card-badge badge-${service.badgeColor || "cyan"}">${service.badge || "Service"}</span>
          </div>
          <h2 class="card-title">${service.title}</h2>
          <p class="card-desc">${service.description}</p>
          <div class="card-tags">
            ${(service.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>
        </div>
        <div class="card-footer">
          <span class="service-url">${service.disabled ? 'Coming soon...' : (service.port ? `${currentHost}:${service.port}` : `${currentHost}`)}</span>
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      `;

      cardsGrid.appendChild(card);
    });
  }

  // Initial Render
  renderCards();
});
