<script>
    import {gsap} from "gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {Observer} from "gsap/dist/Observer";
    import {onMount} from "svelte";
    import home from "$lib/images/Home.webp";
    import chatbot from "$lib/images/Chatbot.webp";
    import aboutus from "$lib/images/QuestionMark.webp";
    import contactus from "$lib/images/AboutUs.webp";
    import {goto} from "$app/navigation";


    gsap.registerPlugin(ScrollTrigger, Observer);
    let mainPage;
    let width;

    onMount(() => {
        mainPage = document.getElementById("page");
        width = window.innerWidth;
        let allowScroll = true;
        let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause();
        let currentIndex = 0;
        let swipePanels = gsap.utils.toArray(".swipe-section .panel");

        // Set z-index levels for the swipe panels
        gsap.set(swipePanels, {zIndex: i => swipePanels.length - i});

        let savedScrollY = 0;

        // Function to restore scroll position
        function restoreScroll() {
            window.scrollTo(0, savedScrollY);
        }

        // Create an observer and disable it initially
        let intentObserver = Observer.create({
            type: "wheel,touch",
            onUp: () => allowScroll && gotoPanel({index: currentIndex - 1, isScrollingDown: false}),
            onDown: () => allowScroll && gotoPanel({index: currentIndex + 1, isScrollingDown: true}),
            tolerance: 10,
            preventDefault: true,
            onEnable(self) {
                allowScroll = false;
                scrollTimeout.restart(true);

                // Save the scroll position and freeze it
                savedScrollY = window.scrollY;
                document.addEventListener("scroll", restoreScroll, {passive: false});
            },
            onDisable() {
                document.removeEventListener("scroll", restoreScroll);
            }
        });

        intentObserver.disable();

        // Handle the panel swipe animations
        function gotoPanel({index, isScrollingDown}) {
            if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
                intentObserver.disable();
                return;
            }
            allowScroll = false;
            scrollTimeout.restart(true);

            let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
            gsap.to(target, {
                yPercent: isScrollingDown ? -100 : 0,
                duration: 0.75
            });

            currentIndex = index;
        }

        // Pin swipe section and initiate observer
        ScrollTrigger.create({
            trigger: ".swipe-section",
            pin: true,
            start: "top top",
            end: "+=200",
            onEnter: (self) => {
                if (intentObserver.isEnabled) return;
                self.scroll(self.start + 1);
                intentObserver.enable();
            },
            onEnterBack: (self) => {
                if (intentObserver.isEnabled) return;
                self.scroll(self.end - 1);
                intentObserver.enable();
            }

        });

        const imageContainers = document.querySelectorAll('.image-container'); // Select all image containers

        imageContainers.forEach((container) => {
            const image = container.querySelector('.image');
            const rectangle = container.querySelector('.grey-rectangle');

            // Create a timeline that moves both the image and the rectangle
            const hoverAnimation = gsap.timeline({paused: true})
                .to(image, {
                    rotation: 10,
                    x: 100,
                    filter: "grayscale(0%)", // Animate the grayscale from 100% to 0%
                    duration: 1,
                    ease: "power2.inOut",
                    scale: 1.1
                })
                .to(rectangle, {
                    rotation: 5,
                    x: 100,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 0); // Ensure the animations are synchronized by starting both at the same time

            // Add event listeners for hover and reverse
            container.addEventListener('mouseenter', () => hoverAnimation.play());
            container.addEventListener('mouseleave', () => hoverAnimation.reverse());
        });
    });
    const onButtonClick = () => {
        gsap.to(".panel", {
            x: -width,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                goto('/chatbot');
            }
        });
    };
</script>

<main class="page">
    <div class="swipe-section">
        <section class="panel" style="background-color: lightcoral">
            <button class="image-container" id="container-1">
                <span class="grey-rectangle"></span>
                <img class="image" loading="lazy" src="{home}" alt="a house"/>
                <span class="headers">home</span>
            </button>
        </section>
        <section class="panel" style="background-color: lightseagreen;">
            <button class="image-container" id="container-2" on:click={onButtonClick}>
                <span class="grey-rectangle"></span>
                <img class="image" loading="lazy" src="{chatbot}" alt="a chatbot"/>
                <span class="headers">chatbot</span>
            </button>
        </section>
        <section class="panel" style="background-color: lightblue;">
            <button class="image-container" id="container-3">
                <span class="grey-rectangle"></span>
                <img class="image" loading="lazy" src="{aboutus}" alt="a question mark"/>
                <span class="headers">about us</span>
            </button>
        </section>
        <section class="panel" style="background-color: lightgoldenrodyellow;">
            <button class="image-container" id="container-4">
                <span class="grey-rectangle"></span>
                <img class="image" loading="lazy" src="{contactus}" alt="contact information"/>
                <span class="headers">contact us</span>
            </button>
        </section>
    </div>
</main>

<style>

    :global(html, body) {
        margin: 0;
        padding: 0;
        width: 100dvw;
        height: 100dvh;
        overflow-x: hidden;
        box-sizing: border-box;
    }


    @font-face {
        font-family: 'BreadleySans';
        src: url('/fonts/BreadleySans-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    section {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-container {
        position: relative;
        width: 20dvw; /* Adjust width for smaller images */
        height: calc(20dvw * 2);
        cursor: pointer;
        /* Maintain 1:2 aspect ratio */
    }

    .grey-rectangle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #8d8d8d;
        transform: rotate(-10deg);
        z-index: 0;
    }

    .image {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotate(-5deg);
        opacity: 0.8;
        z-index: 1;
        filter: grayscale(100%);
    }

    .headers {
        position: absolute;
        top: 40%; /* Center vertically within the image */
        transform: translate(-50%, -75%); /* Center horizontally */
        font-family: "BreadleySans", sans-serif;
        color: #000000;
        font-size: 7dvw;
        z-index: 2; /* Above the image */
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Optional: add text shadow for readability */
    }

    .swipe-section {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .panel {
        will-change: transform;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        color: white;
    }

    button {
        border: none;
        padding: 0;
        margin: 0;
        background: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    span.headers {
        display: block; /* Makes the span behave like a block element */
    }

</style>