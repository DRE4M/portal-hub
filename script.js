document.addEventListener("DOMContentLoaded", () => {
  const config = window.PORTAL_CONFIG || {
    defaultOciIp: "129.225.197.60",
    title: "Dev Workspace Portal",
    subtitle: "Oracle Cloud Infrastructure & Microservices Hub",
    services: []
  };

  const ociIpInput = document.getElementById("oci-ip-input");
  const btnUpdateIp = document.getElementById("btn-update-ip");
  const cardsGrid = document.getElementById("cards-grid");

  // 저장된 OCI IP가 있으면 불러오기, 없으면 defaultOciIp 사용
  let currentIp = localStorage.getItem("portal_oci_ip") || config.defaultOciIp;
  if (ociIpInput) {
    ociIpInput.value = currentIp;
  }

  // IP 변경 시 이벤트
  if (btnUpdateIp && ociIpInput) {
    btnUpdateIp.addEventListener("click", () => {
      const newIp = ociIpInput.value.trim();
      if (newIp) {
        currentIp = newIp;
        localStorage.setItem("portal_oci_ip", currentIp);
        renderCards();
        showToast(`OCI IP가 ${currentIp}로 업데이트되었습니다.`);
      }
    });
  }

  // 카드 렌더링 함수
  function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = "";

    config.services.forEach((service) => {
      const isCustomIp = Boolean(currentIp);
      const targetHost = isCustomIp ? currentIp : "localhost";
      const fullUrl = service.port
        ? `${service.protocol}://${targetHost}:${service.port}`
        : `${service.protocol}://${targetHost}`;

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
          <span class="service-url">${service.disabled ? 'Coming soon...' : (service.port ? `:${service.port}` : '/')}</span>
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      `;

      cardsGrid.appendChild(card);
    });
  }

  function showToast(message) {
    let toast = document.getElementById("portal-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "portal-toast";
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: rgba(99, 102, 241, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        backdrop-filter: blur(8px);
        z-index: 9999;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 3000);
  }

  // Initial Render
  renderCards();
});
