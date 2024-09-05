<script lang="ts">
    import { gsap } from "gsap";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let teamSections: HTMLElement[] = [];
    onMount(() => {
        teamSections = Array.from(document.querySelectorAll("section"));

        teamSections.forEach((section, index) => {
            // Alternate animations for left and right sides
            const animationConfig = {
                opacity: 0,
                x: index % 2 === 0 ? -200 : 200, // Slide left or right depending on section index, hardest part for me
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.3,
            };

            gsap.from(section, animationConfig);
        });
    });

    const team = [
        {
            name: "Daniel O' Brien",
            image: "/src/lib/images/Daniel.jpg",
            description:
                "Daniel is the full stack developer and also the leader of our team. He made the AI Bot more advanced and become more friendly to user.",
            linkedin: "https://www.linkedin.com/in/daniel-o-brien-09598a242/",
        },

        {
            name: "Dean Ghassemi",
            image: "/src/lib/images/Dean.jpeg",
            description:
                "Dean is the UI designer & full stack developer who make the bot more advanced. ",
            linkedin: "https://www.linkedin.com/in/dean-ghassemi/",
        },

        {
            name: "Khoi Anh Ngo",
            image: "/src/lib/images/Khoi.jpeg",
            description:
                "Khoi is a developer, handling databases and server-side logic and authentication.",
            linkedin: "https://www.linkedin.com/in/khoi-anh-ngo/",
        },
    ];
</script>

<main class="font-monte flex flex-col min-h-screen bg-gray-100 text-gray-900">
    <div class="flex flex-col items-center justify-center py-10">
        <h1 class="text-5xl font-bold mb-10">Meet Our Team</h1>

        {#each team as member, index}
            <section
                class="w-full flex flex-col md:flex-row items-center justify-center my-16 max-w-6xl mx-auto space-y-10 md:space-y-0 md:space-x-10"
            >
                <!-- Alternating left/right profiles -->
                {#if index % 2 === 0}
                    <!-- Profile on the left -->
                    <div class="md:w-1/2 flex justify-center">
                        <img
                            src={member.image}
                            alt={member.name}
                            class="rounded-full w-48 h-48 shadow-lg"
                        />
                    </div>
                    <!-- Description on the right -->
                    <div class="md:w-1/2 flex flex-col justify-center">
                        <h2 class="text-3xl font-bold mb-4">{member.name}</h2>
                        <p class="text-lg">{member.description}</p>
                        <!-- LinkedIn Icon with Link -->
                        <a
                            href={member.linkedin}
                            target="_blank"
                            class="text-blue-500 hover:text-blue-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="90"
                                fill="currentColor"
                                class="bi bi-linkedin"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                                />
                            </svg>
                        </a>
                    </div>
                    
                {:else}
                    <!-- Description on the left -->
                    <div
                        class="md:w-1/2 flex flex-col justify-center order-2 md:order-1"
                    >
                        <h2 class="text-3xl font-bold mb-4">{member.name}</h2>
                        <p class="text-lg">{member.description}</p>
                        <a
                        href={member.linkedin}
                        target="_blank"
                        class="text-blue-500 hover:text-blue-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="90"
                            fill="currentColor"
                            class="bi bi-linkedin"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                            />
                        </svg>
                    </a>
                    </div>
                    

                    <!-- Profile on the right -->
                    <div
                        class="md:w-1/2 flex justify-center order-1 md:order-2"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            class="rounded-full w-48 h-48 shadow-lg"
                        />
                    </div>
                {/if}
            </section>
        {/each}
    </div>
</main>
