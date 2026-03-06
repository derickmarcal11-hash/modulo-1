// ===== script.js =====

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- MENU RESPONSIVO ----------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 700) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ---------- BOTÃO VOLTAR AO TOPO ----------
    const backBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    backBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ---------- ANIMAÇÃO DE SCROLL (FADE-IN) E BARRAS DE PROGRESSO ----------
    // Seleciona todas as seções que terão efeito fade-in
    const sections = document.querySelectorAll('.section');
    const progressBars = document.querySelectorAll('.progress-fill');

    // Configuração do Intersection Observer
    const observerOptions = {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer para fade-in e ativação das barras
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe de visibilidade (fade-in)
                entry.target.classList.add('visible');

                // Se a seção visível contém barras de progresso, anima
                const fills = entry.target.querySelectorAll('.progress-fill');
                if (fills.length > 0) {
                    fills.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        if (width) {
                            bar.style.width = width + '%';
                        }
                    });
                }

                // (Opcional) parar de observar após a primeira aparição
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplica observer em todas as seções
    sections.forEach(section => observer.observe(section));

    // Também observa as barras individualmente (caso não estejam em seção)
    progressBars.forEach(bar => observer.observe(bar));

    // ---------- INICIALIZAÇÃO: verifica elementos já visíveis no load ----------
    function checkInitialVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Se o topo da seção estiver a menos de 70% da tela, considera visível
            if (rect.top < windowHeight * 0.75) {
                section.classList.add('visible');
                // Ativa as barras de progresso dentro da seção
                const fills = section.querySelectorAll('.progress-fill');
                fills.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) bar.style.width = width + '%';
                });
            }
        });
    }

    // Executa após pequeno atraso para garantir que tudo carregou
    setTimeout(checkInitialVisibility, 200);

    // ---------- BOTÃO "VER PROJETO" (simulação) ----------
    const projectButtons = document.querySelectorAll('.btn-project');
    projectButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const project = this.getAttribute('data-project') || 'projeto';
            alert(`🔍 Visualizando ${project} (demonstração interativa)`);
        });
    });

    // ---------- BOTÃO ENVIAR MENSAGEM (simulação) ----------
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            alert('📨 Mensagem enviada com sucesso! (modo demonstração)');
        });
    }

    // ---------- AJUSTE DE CLIQUE NO MENU PARA LINKS INTERNOS (scroll suave) ----------
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
