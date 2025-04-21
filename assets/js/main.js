$(window).on("load", function () {
    gsap.registerPlugin(ScrollTrigger);

    // header > movin-list
    document.querySelectorAll('.movin-list a[href^="."]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
    
            const targetSelector = link.getAttribute('href');
            const target = document.querySelector(targetSelector);
    
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                    },
                    ease: "power2.out"
                });
            }
        });
    });

    // sc-exterior
    exteriorAni = gsap.timeline({});
    exteriorAni
        .fromTo(".sc-exterior .exterior-group .bg", {
            scale: 1.25
        }, {
            scrollTrigger: {
                trigger: ".sc-exterior .exterior-group",
                start: "50% 50%",
                end: "100% 100%",
                scrub: true,
                // markers: true,
                onEnter: () => {
                    gsap.to(".sc-exterior .exterior-group .bg", {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out"
                    })
                },
                onEnterBack: () => {
                    gsap.to(".sc-exterior .exterior-group .bg", {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    })
                },
                onLeave: () => {
                    gsap.to(".sc-exterior .exterior-group .bg", {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out"
                    })
                },
                onLeaveBack: () => {
                    gsap.to(".sc-exterior .exterior-group .bg", {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    })
                }
            },
            scale: 1,
        })

        .fromTo(".sc-exterior .grill-group .bg", {
            opacity: 0,
            scale: 1.5,
            xPercent: -20,
        }, {
            scrollTrigger: {
                trigger: ".sc-exterior .grill-group",
                start: "25% 0%",
                end: "100% 100%",
                scrub: true,
                // markers: true,
            },
            opacity: 1,
            xPercent: 0,
            scale: 1,
            duration: .3,
            ease: "power2.out",
        })

    const rows = gsap.utils.toArray(".sc-exterior .exterior-group .text-area .row");
    rows.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "0% 50%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    })

    // 텍스트 투명도 변화 애니메이션
    opacityAniEl = document.querySelectorAll('[data-opacity="true"]')
    opacityAniEl.forEach(element => {
        let added = false;
        const bg = document.querySelector(`${element.dataset.parent} .bg`);

        gsap.fromTo(element, {
            opacity: 0,
        }, {
            scrollTrigger: {
                trigger: element.dataset.parent,
                start: "50% 50%",
                end: "100% 100%",
                scrub: true,
                // markers: true,
                onUpdate: (self) => {
                    if (self.progress > 0.5 && !added && bg) {
                        bg.style.maskImage = "linear-gradient(to bottom, black 80%, transparent 100%)";
                        bg.style.webkitMaskImage = "linear-gradient(to bottom, black 80%, transparent 100%)";
                        added = true;
                    }
                }
            },
            opacity: 1,
        }, )
    })

    // 텍스트 페이드업 애니메이션
    upAniEl = document.querySelectorAll('[data-text="up"]')
    upAniEl.forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            yPercent: 50,
        }, {
            scrollTrigger: {
                trigger: element.dataset.parent,
                start: "50% 50%",
                end: "100% 100%",
                scrub: true,
                // markers: true,
            },
            opacity: 1,
            yPercent: 0,
        }, )
    })

    $(".sc-exterior .color-group .btn-area .btn").click(function (e) {
        e.preventDefault();
        $(this).addClass("selected").siblings().removeClass("selected")

        tab = $(this).data('tab');
        $(tab).addClass("active").siblings().removeClass("active")
    })

    $(".sc-exterior .color-group .color-item").click(function () {
        idx = $(this).index();
        newColor = $(this).data("color");

        $(this).addClass('active').siblings().removeClass('active');
        $(".sc-exterior .color-group .bg").eq(idx).addClass('active').siblings().removeClass('active');

        gsap.fromTo(".sc-exterior .color-group", {
            background: `linear-gradient(180deg, ${newColor} 0%, rgba(85, 85, 85, 0.1) 45.31%, rgba(85, 85, 85, 0.30) 68.79%, rgba(85, 85, 85, 0.40) 70.21%, rgba(85, 85, 85, 0.10) 74.48%, rgba(85, 85, 85, 0.10) 87.5%, rgba(85, 85, 85, 0.00) 100%)`
        }, {
            background: newColor,
            duration: 1,
            ease: "power2.out"
        });
    })

    gsap.to(".sc-interior .seat-group .bg", {
        scrollTrigger: {
            trigger: ".sc-interior .seat-group",
            start: "50% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
            onLeave: () => {
                gsap.to(".sc-interior .seat-group .bg", {
                    opacity: 0,
                    duration: .3,
                })
            },
            onLeaveBack: () => {
                gsap.to(".sc-interior .seat-group .bg", {
                    opacity: 1,
                    duration: .3,
                })
            }
        },
        scale: 1.2,
        ease: "power2.out"
    })

    gsap.to(".sc-interior .detail-group .img-area", {
        scrollTrigger: {
            trigger: ".sc-interior .detail-group",
            start: "25% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
            onUpdate: (e) => {
                if (e.progress <= 0.15) {
                    $(".sc-interior .detail-group .row-1").addClass("active").siblings().removeClass("active")
                } else if (e.progress > 0.15 && e.progress <= 0.35) {
                    $(".sc-interior .detail-group .row-2").addClass("active").siblings().removeClass("active")
                } else if (e.progress > 0.35 && e.progress <= 0.55) {
                    $(".sc-interior .detail-group .row-3").addClass("active").siblings().removeClass("active")
                } else if (e.progress > 0.65 && e.progress <= 1) {
                    $(".sc-interior  .detail-group .row-4").addClass("active").siblings().removeClass("active")
                }
            }
        },
        yPercent: -80,
    })

    gsap.to(".sc-technology .detail-group .img-area", {
        scrollTrigger: {
            trigger: ".sc-technology .detail-group",
            start: "25% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
            onUpdate: (e) => {
                if (e.progress <= 0.15) {
                    $(".sc-technology .detail-group .row-1").addClass("active").siblings().removeClass("active")
                } else if (e.progress > 0.15 && e.progress <= 0.45) {
                    $(".sc-technology .detail-group .row-2").addClass("active").siblings().removeClass("active")
                } else {
                    $(".sc-technology .detail-group .row-3").addClass("active").siblings().removeClass("active")
                }
            }
        },
        yPercent: -75,
    })

    gsap.to(".sc-performance .mode-group .img-area", {
        scrollTrigger: {
            trigger: ".sc-performance .mode-group",
            start: "25% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
            onUpdate: (e) => {
                if (e.progress <= 0.35) {
                    $(".sc-performance .mode-group .row-1").addClass("active").siblings().removeClass("active")
                } else {
                    $(".sc-performance .mode-group .row-2").addClass("active").siblings().removeClass("active")
                }
            }
        },
        yPercent: -60,
    })

    gsap.to(".sc-safety .detail-group .img-area", {
        scrollTrigger: {
            trigger: ".sc-safety .detail-group",
            start: "25% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
            onUpdate: (e) => {
                if (e.progress <= 0.1) {
                    $(".sc-safety .detail-group .row-1").addClass("active").siblings().removeClass("active")
                } else if (e.progress > 0.1 && e.progress <= 0.45) {
                    $(".sc-safety .detail-group .row-2").addClass("active").siblings().removeClass("active")
                } else {
                    $(".sc-safety .detail-group .row-3").addClass("active").siblings().removeClass("active")
                }
            }
        },
        yPercent: -75,
    })

    const images = document.querySelectorAll(".sc-interior .color-group .img-area .bg-ani");
    images.forEach((img, idx) => {
        gsap.fromTo(img, {
            clipPath: "inset(100% 0% 0% 0%)"
        }, {
            scrollTrigger: {
                trigger: img,
                start: `${(idx) * 35 + 35}% 25%`,
                end: `${(idx) * 35 + 35}% 0%`,
                scrub: true,
                // markers: true,
                onEnter: () => {
                    $(".sc-interior .color-group .color-item").eq(idx + 1).addClass("active").siblings().removeClass("active");
                },
                onEnterBack: () => {
                    $(".sc-interior .color-group .color-item").eq(idx + 1).addClass("active").siblings().removeClass("active");
                },
                onLeaveBack: () => {
                    $(".sc-interior .color-group .color-item").eq(idx).addClass("active").siblings().removeClass("active");
                }
            },
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none"
        });
    });

    gsap.fromTo(".sc-interior .convenience-group .col-2", {
        yPercent: 100,
    }, {
        scrollTrigger: {
            trigger: ".sc-interior .convenience-group",
            start: "50% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
        },
        yPercent: 0,
    })


    gsap.fromTo(".sc-suspension .detail-group .col-wrapper", {
        xPercent: 10,
    }, {
        scrollTrigger: {
            trigger: ".sc-suspension .detail-group",
            start: "25% 50%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
        },
        xPercent: -30,
        ease: "none",
    })

    // 768px ~ 
    gsap.matchMedia().add("(min-width: 768px)", function () {
        // header
        gsap.to("#header .main-nav", {
            scrollTrigger: {
                trigger: "#wrap",
                start: "top+=50 top",
                toggleActions: "play none reverse none",
                onEnter: () => {
                    $("#header .sub-nav").css("top", "0");
                    $("#header .sub-nav").css("border", "none");
                    $("#header .progress-bar").css("opacity", "1");
                },
                onLeaveBack: () => {
                    $("#header .main-nav").css("opacity", "1");
                    $("#header .sub-nav").css("top", "100%");
                    $("#header .sub-nav").css("border-top", "0.1px solid rgba(255,255,255,0.25)");
                    $("#header .progress-bar").css("opacity", "0");

                }
            },
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });

        gsap.fromTo("#header .progress-bar", {
            width: "0%"
        }, {
            scrollTrigger: {
                trigger: "#wrap",
                start: "0% 0%",
                end: "100% 100%",
                scrub: true,
                // markers: true, 
            },
            width: "100%",
        });
    })
})