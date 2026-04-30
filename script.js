// ============================================
// 🌟 LUXÉ - PREMIUM JAVASCRIPT
// ============================================

// 📞 Configuration
const CONFIG = {
    WHATSAPP_NUMBER: "201118618196",
    ANIMATION_SPEED: 0.6,
    PARTICLE_COUNT: 15,
};

// ============================================
// 🎨 PARTICLES BACKGROUND
// ============================================

class ParticleGenerator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
    }

    generate() {
        const container = this.container;
        if (!container) return;

        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 300 + 50 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
            
            container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    clear() {
        this.particles.forEach(p => p.remove());
        this.particles = [];
    }
}

// Initialize particles
const particleGen = new ParticleGenerator('particlesContainer');
particleGen.generate();

// ============================================
// 🛍️ PRODUCT ORDERING SYSTEM
// ============================================

/**
 * ترتيب منتج عبر واتساب
 */
function order(productCode, productName, price) {
    const message = `✨ السلام عليكم ورحمة الله وبركاته ✨\n\n👑 عايزة أطلب المنتج الفاخر:\n\n📌 اسم المنتج: ${productName}\n💎 كود المنتج: ${productCode}\n💰 السعر: E£ ${price}\n\n⭐ أرجو تأكيد التوفر والمواصفات والمدة\n🎁 أود الاستفادة من الخصم 15% لأول طلب\n\n💕 شكراً لكم`;
    
    const url = createWhatsAppUrl(message);
    openLink(url);
    
    // Track event
    trackEvent('order_click', {
        product: productName,
        code: productCode,
        price: price
    });
}

/**
 * طلب تصميم مخصص
 */
function contactForCustom(productType = 'استفسار عام') {
    const message = `✨ السلام عليكم ورحمة الله وبركاته ✨\n\n🎨 أنا مهتمة بـ تصميم مخصص:\n\n📌 نوع المنتج: ${productType}\n\n💭 أتمنى معرفة:\n✓ الخطوات والمدة\n✓ السعر والخيارات\n✓ طريقة الدفع\n\n💕 أنتظر ردك`;
    
    const url = createWhatsAppUrl(message);
    openLink(url);
    
    trackEvent('custom_design_inquiry', { type: productType });
}

/**
 * التواصل العام
 */
function contactWhatsapp() {
    const message = `✨ السلام عليكم ورحمة الله وبركاته ✨\n\n👋 أنا مهتمة بمنتجات Luxé الفاخرة\n\nعندي استفسار وأود معرفة المزيد... 💕`;
    
    const url = createWhatsAppUrl(message);
    openLink(url);
    
    trackEvent('general_inquiry');
}

/**
 * إنشاء رابط واتساب
 */
function createWhatsAppUrl(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * فتح رابط
 */
function openLink(url, target = "_blank") {
    window.open(url, target);
}

// ============================================
// 📱 NAVIGATION & SCROLL
// ============================================

/**
 * التمرير إلى قسم المجموعات
 */
function scrollToCollections() {
    const element = document.getElementById('collections');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        trackEvent('scroll_to_collections');
    }
}

/**
 * التمرير إلى الأعلى
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// 🎭 NAVBAR INTERACTIONS
// ============================================

let mobileMenuOpen = false;

/**
 * تبديل القائمة على الموبايل
 */
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const btn = document.getElementById('mobileMenuBtn');
    
    if (!menu) return;
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        menu.style.display = 'flex';
        menu.style.position = 'absolute';
        menu.style.top = '100%';
        menu.style.left = '0';
        menu.style.right = '0';
        menu.style.flexDirection = 'column';
        menu.style.background = 'rgba(255, 255, 255, 0.95)';
        menu.style.padding = '15px';
        menu.style.gap = '10px';
        menu.style.zIndex = '999';
        menu.style.animation = 'slideDown 0.3s ease';
        btn.textContent = '✕';
    } else {
        menu.style.display = 'flex';
        menu.style.position = 'static';
        menu.style.flexDirection = 'row';
        menu.style.background = 'transparent';
        menu.style.padding = '0';
        btn.textContent = '☰';
    }
}

/**
 * إغلاق القائمة عند اختيار رابط
 */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuOpen) {
                toggleMenu();
            }
            
            // Add active state
            navLinks.forEach(l => l.style.color = '');
            this.style.color = 'var(--primary)';
        });
    });
});

// ============================================
// 🎨 SCROLL ANIMATIONS
// ============================================

/**
 * Intersection Observer للأنيميشنات على التمرير
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // انتظر حتى يتم تحميل DOM كاملاً
    setTimeout(() => {
        const elements = document.querySelectorAll('.product-card, .testimonial-card, .about-item');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}

// ============================================
// ⭐ ACTIVE NAVIGATION LINK
// ============================================

/**
 * تحديث الرابط النشط في الـ navbar
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--primary)';
            } else {
                link.style.color = '';
            }
        });
    });
}

// ============================================
// 📊 ANALYTICS & TRACKING
// ============================================

/**
 * تتبع الأحداث المهمة
 */
function trackEvent(eventName, eventData = {}) {
    const eventLog = {
        name: eventName,
        data: eventData,
        timestamp: new Date().toLocaleTimeString('ar-EG'),
        url: window.location.href
    };
    
    console.log('📊 Event:', eventLog);
    
    // يمكن إرسال البيانات إلى خادم هنا
}

/**
 * قياس وقت التحميل
 */
function logPageLoadTime() {
    if (window.performance && window.performance.timing) {
        const navigationStart = window.performance.timing.navigationStart;
        const loadComplete = window.performance.timing.loadEventEnd;
        const loadTime = loadComplete - navigationStart;
        console.log(`⏱️ وقت التحميل: ${loadTime}ms`);
        trackEvent('page_load_time', { duration: loadTime });
    }
}

/**
 * عداد الزيارات
 */
function initializeVisitorCounter() {
    let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    console.log(`👤 زيارة رقم: ${visitCount}`);
}

// ============================================
// 🎬 SMOOTH SCROLL BEHAVIOR
// ============================================

/**
 * إضافة smooth scroll للروابط الداخلية
 */
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 🔔 NOTIFICATIONS & FEEDBACK
// ============================================

/**
 * إظهار تنبيه بسيط
 */
function showNotification(message, type = 'info', duration = 3000) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // يمكن إضافة مكتبة Toastify للإشعارات الجميلة
}

// ============================================
// 🎁 SPECIAL OFFERS & PROMOTIONS
// ============================================

/**
 * فحص العروض الخاصة
 */
function checkSpecialPromotion() {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    
    // عروض في أوقات معينة
    if (currentHour >= 18 && currentHour <= 22) {
        console.log('🎉 هناك عرض خاص الآن!');
    }
    
    // عروض نهاية الأسبوع
    if (currentDay === 5 || currentDay === 6) {
        console.log('🎊 عروض نهاية الأسبوع متاحة!');
    }
}

// ============================================
// 💾 LOCAL STORAGE
// ============================================

/**
 * حفظ تفضيلات المستخدم
 */
function saveUserPreferences() {
    const preferences = {
        theme: 'light',
        language: 'ar',
        lastVisit: new Date().toISOString(),
        visitCount: parseInt(localStorage.getItem('visitCount')) || 0
    };
    
    localStorage.setItem('luxePreferences', JSON.stringify(preferences));
}

/**
 * تحميل تفضيلات المستخدم
 */
function loadUserPreferences() {
    const saved = localStorage.getItem('luxePreferences');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// ============================================
// 🎮 INTERACTIVE ELEMENTS
// ============================================

/**
 * إضافة تأثيرات على المنتجات
 */
function setupProductInteractions() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach((product, index) => {
        product.style.animationDelay = (index * 0.1) + 's';
        
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// 🌙 THEME SWITCHING (اختياري)
// ============================================

/**
 * تبديل المظهر (مظلم/فاتح)
 */
function toggleTheme() {
    const isDark = document.body.style.background === 'dark';
    if (isDark) {
        document.body.style.background = 'light';
    } else {
        document.body.style.background = 'dark';
    }
    
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// ============================================
// 🎯 INITIALIZATION
// ============================================

/**
 * تهيئة الموقع عند التحميل الكامل
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ LUXÉ - Premium Accessories Website');
    console.log('🎨 Initializing...');
    
    // تشغيل جميع الوظائف
    initScrollAnimations();
    setupSmoothScroll();
    updateActiveNavLink();
    setupProductInteractions();
    initializeVisitorCounter();
    saveUserPreferences();
    checkSpecialPromotion();
    
    console.log('✅ Initialization complete!');
});

/**
 * عند انتهاء تحميل الصفحة
 */
window.addEventListener('load', function() {
    logPageLoadTime();
    
    // إضافة تأثيرات الزر
    const buttons = document.querySelectorAll('.btn, .order-btn, .contact-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // تأثير النقر
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

// ============================================
// 🎪 EASTER EGGS
// ============================================

/**
 * كود سري 👀
 */
let keySequence = [];
document.addEventListener('keydown', function(e) {
    keySequence.push(e.key.toLowerCase());
    
    // احفظ آخر 5 مفاتيح فقط
    if (keySequence.length > 5) {
        keySequence.shift();
    }
    
    // فحص كود "luxe"
    const code = keySequence.join('');
    if (code.includes('luxe')) {
        console.log('🎉 🌟 أنت اكتشفت السر! 🌟 🎉');
        document.body.style.filter = 'brightness(1.2) saturate(1.5)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 2000);
    }
});

// ============================================
// 🛡️ ERROR HANDLING
// ============================================

/**
 * معالجة الأخطاء
 */
window.addEventListener('error', function(e) {
    console.error('❌ Error:', e.message);
    console.error('📍 At:', e.filename, 'Line:', e.lineno);
});

/**
 * معالجة الأخطاء غير المعالجة في Promises
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('⚠️ Unhandled Promise rejection:', e.reason);
});

// ============================================
// 📲 PWA SUPPORT (اختياري)
// ============================================

/**
 * تسجيل Service Worker للـ PWA
 */
if ('serviceWorker' in navigator) {
    // يمكن إضافة Service Worker هنا
    // navigator.serviceWorker.register('/sw.js');
}

// ============================================
// 🎊 PERFORMANCE TIPS
// ============================================

console.log(`
╔══════════════════════════════════════╗
║  ✨ LUXÉ - Premium Accessories ✨  ║
║  Your elegance is our priority      ║
║  Made with ❤️  from Egypt 🇪🇬      ║
╚══════════════════════════════════════╝
`);

console.log('📱 أنت تزور موقع Luxé من:', {
    device: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'موبايل' : 'ديسكتوب',
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
});
