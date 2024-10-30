export const getInfoForOccasion = (occasion, breakdown) => {
    const templates = {
        coffee_date: {
            paragraph: `For a Coffee Date, go for a relaxed yet polished look. Choose a fitted, comfortable top like a solid-colored t-shirt or a casual button-down. Pair it with clean jeans or chinos for a smart-casual vibe. Stick with simple, stylish sneakers or loafers for shoes, ensuring both comfort and style. Accessories should be minimal—think a simple watch or bracelet that adds a touch of character without overpowering the outfit.`,
            bulletPoints: [
                { label: 'Tops', description: `Casual t-shirt or relaxed button-down` },
                { label: 'Pants', description: `Jeans or chinos` },
                { label: 'Shoes', description: `Simple sneakers or loafers` },
                { label: 'Accessories', description: `Minimal watch or bracelet` }
            ]
        },
        casual_outing: {
            paragraph: `On a Casual Outing, aim for a versatile outfit that balances comfort with style. A classic hoodie or layered t-shirt and jacket combo can work well for the top, while jeans or joggers provide a relaxed foundation. For shoes, go with comfortable yet stylish sneakers that can handle whatever the day brings. A cap or backpack can make practical accessories, giving your outfit a laid-back yet coordinated feel.`,
            bulletPoints: [
                { label: 'Tops', description: `Hoodie or t-shirt layered with a casual jacket` },
                { label: 'Pants', description: `Jeans or joggers` },
                { label: 'Shoes', description: `Comfortable, stylish sneakers` },
                { label: 'Accessories', description: `Cap or backpack` }
            ]
        },
        clubbing: {
            paragraph: `For Clubbing, turn up the style. Opt for a fitted, darker-toned shirt or a sleek turtleneck for a top that feels edgy and elevated. Pair it with slim or tailored pants to give a polished finish. Dress boots or low-profile leather sneakers are perfect for this setting, offering a sophisticated touch. Accessories like a chain necklace or bold wristwatch add some flair without overdoing it, rounding out a look that’s ready for nightlife.`,
            bulletPoints: [
                { label: 'Tops', description: `Fitted shirt or sleek turtleneck` },
                { label: 'Pants', description: `Slim or tailored pants` },
                { label: 'Shoes', description: `Dress boots or low-profile leather sneakers` },
                { label: 'Accessories', description: `Chain necklace or bold wristwatch` }
            ]
        },
        fancy_dinner: {
            paragraph: `For a Fancy Dinner, go for a sophisticated and elegant look that’s appropriate for a formal setting. A crisp button-down shirt or a lightweight sweater in a neutral or deep color works well for the top. Pair it with tailored dress pants for a refined silhouette. Leather dress shoes complete the polished look, adding class and style. Subtle accessories, like a nice watch or cufflinks, can enhance the outfit without overwhelming it.`,
            bulletPoints: [
                { label: 'Tops', description: `Button-down shirt or lightweight sweater` },
                { label: 'Pants', description: `Tailored dress pants` },
                { label: 'Shoes', description: `Leather dress shoes` },
                { label: 'Accessories', description: `Subtle watch or cufflinks` }
            ]
        },
        live_concert: {
            paragraph: `For a Live Concert, prioritize comfort and style with a bit of an edgy vibe to match the energetic atmosphere. A graphic t-shirt or casual button-down makes a great top choice, adding a trendy, concert-ready look. Pair it with relaxed jeans or cargo pants for a slightly rugged feel that allows freedom of movement. Comfortable boots or durable sneakers are ideal for standing and moving around all night. Accessories like a leather bracelet or a small crossbody bag for essentials complete the outfit, adding to the concert-ready look without being too bulky.`,
            bulletPoints: [
                { label: 'Tops', description: `Graphic t-shirt or casual button-down` },
                { label: 'Pants', description: `Relaxed jeans or cargo pants` },
                { label: 'Shoes', description: `Comfortable boots or durable sneakers` },
                { label: 'Accessories', description: `Leather bracelet, small crossbody bag` }
            ]
        },
        movie_date: {
            paragraph: `For a Movie Date, aim for a relaxed, cozy, and slightly stylish look that’s comfortable for sitting through a film. A well-fitted t-shirt or casual sweater works great for the top, giving a low-key but put-together feel. Pair it with jeans or chinos for a casual but neat vibe. Stick with comfortable sneakers or slip-on shoes that match the laid-back atmosphere. Minimal accessories like a watch or a casual jacket complete the outfit.`,
            bulletPoints: [
                { label: 'Tops', description: `Well-fitted t-shirt or casual sweater` },
                { label: 'Pants', description: `Jeans or chinos` },
                { label: 'Shoes', description: `Comfortable sneakers or slip-ons` },
                { label: 'Accessories', description: `Minimal watch, casual jacket` }
            ]
        },
        art_gallery: {
            paragraph: `For an Art Gallery visit, a touch of sophistication and creativity in your outfit can make an impression. Go for a stylish button-down shirt or a turtleneck as a top that feels artsy and refined. Slim-fit pants or dark jeans pair well, giving a polished silhouette. Choose loafers or ankle boots to elevate the look with a hint of style. Accessories like a statement watch or a sleek scarf add subtle flair without overdoing it.`,
            bulletPoints: [
                { label: 'Tops', description: `Stylish button-down or turtleneck` },
                { label: 'Pants', description: `Slim-fit pants or dark jeans` },
                { label: 'Shoes', description: `Loafers or ankle boots` },
                { label: 'Accessories', description: `Statement watch or sleek scarf` }
            ]
        },
        museum_tour: {
            paragraph: `For a Museum Tour, prioritize comfort with a touch of sophistication for all the walking and exploring. A comfortable, breathable top like a polo shirt or a long-sleeve shirt suits this setting well. Pair it with chinos or casual pants that are easy to move in. Opt for comfortable yet stylish walking shoes or low-profile sneakers to handle the walking. Minimal accessories like a crossbody bag for essentials and a simple watch keep the look functional and stylish.`,
            bulletPoints: [
                { label: 'Tops', description: `Polo shirt or long-sleeve shirt` },
                { label: 'Pants', description: `Chinos or casual pants` },
                { label: 'Shoes', description: `Comfortable walking shoes or low-profile sneakers` },
                { label: 'Accessories', description: `Crossbody bag, simple watch` }
            ]
        },
        outdoor_adventure: {
            paragraph: `For an Outdoor Adventure, practicality is key. Choose a moisture-wicking or breathable t-shirt as the base layer, and consider adding a lightweight jacket for changing weather conditions. Opt for durable cargo or hiking pants that offer flexibility and storage for essentials. Hiking boots or trail shoes with good grip are essential for outdoor terrain. A hat, sunglasses, and a small backpack complete the outfit, keeping you protected and prepared for anything.`,
            bulletPoints: [
                { label: 'Tops', description: `Moisture-wicking t-shirt, lightweight jacket` },
                { label: 'Pants', description: `Durable cargo or hiking pants` },
                { label: 'Shoes', description: `Hiking boots or trail shoes` },
                { label: 'Accessories', description: `Hat, sunglasses, small backpack` }
            ]
        },
    };

    return templates[occasion] || { paragraph: "No specific tips available for this occasion.", bulletPoints: [] };
};