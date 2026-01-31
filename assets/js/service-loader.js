
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('id');

    // Data definition for all services
    const servicesData = {
        'identity': {
            title: "Brand Identity",
            subtitle: "Crafting visual systems that tell your unique story",
            image: "assets/img/service-identity.jpg", // Fallback or specific image
            overview: `
                <p>Your brand is more than just a logo; it's the entire visual and emotional experience your customers have with your company. Our Brand Identity service builds comprehensive design systems that ensure consistency, recognition, and resonance across every touchpoint.</p>
                <p>We start by understanding the core of your business—your values, your audience, and your market position. From there, we translate these abstract concepts into concrete visual elements: color palettes that evoke specific emotions, typography that speaks with a distinct voice, and logos that become iconic symbols of your promise.</p>
            `,
            benefits: [
                "Distinct Market Positioning",
                "Increased Brand Recognition",
                "Consistent Visual Language",
                "Scalable Design Systems"
            ],
            process: [
                { title: "Visual Discovery", desc: "Exploring mood boards, color psychology, and typographic directions." },
                { title: "Concept Development", desc: "Creating multiple distinct identity routes for your review." },
                { title: "Refinement & Systems", desc: "Expanding the chosen direction into a full design system." },
                { title: "Brand Guidelines", desc: "Documenting rules to ensure long-term consistency." }
            ]
        },
        'structural': {
            title: "Structural Design",
            subtitle: "Engineering packaging that protects and delights",
            image: "assets/img/service-structural.jpg",
            overview: `
                <p>Structural packaging design is the perfect blend of engineering and art. It's not just about how a package looks, but how it works, how it feels in the hand, and how it protects what's inside. Our team creates innovative structures that stand out on the shelf and provide an unforgettable unboxing experience.</p>
                <p>We consider every constraint: manufacturing feasibility, shipping durability, retail shelf dimensions, and user ergonomics. Our goal is to minimize material waste while maximizing impact, creating packaging that is as functional as it is beautiful.</p>
            `,
            benefits: [
                "Optimized Materials Usage",
                "Enhanced Product Protection",
                "Memorable Unboxing Experience",
                "Manufacturing Feasibility"
            ],
            process: [
                { title: "Technical Briefing", desc: "Understanding product specs, supply chain, and retail requirements." },
                { title: "Ideation & Sketching", desc: "Brainstorming folding patterns and opening mechanisms." },
                { title: "White Sample Prototyping", desc: "Creating physical mockups to test fit and function." },
                { title: "Die-Line Creation", desc: "Preparing precise technical files for production." }
            ]
        },
        'strategy': {
            title: "Brand Strategy",
            subtitle: "Defining your path to market leadership",
            image: "assets/img/service-strategy.jpg",
            overview: `
                <p>A beautiful design without a strategy is just decoration. Our Brand Strategy service lays the foundation for everything we do. We dig deep to uncover the "why" behind your business, defining your purpose, your promise, and your personality.</p>
                <p>We strive to answer critical questions: Who are you fighting against? Who are you fighting for? What makes you different? The answers to these questions form a strategic roadmap that guides visual design, messaging, and marketing decisions, ensuring that every dollar you spend builds towards a cohesive long-term vision.</p>
            `,
            benefits: [
                "Clear Competitive Advantage",
                "Targeted Messaging",
                "Long-term Growth Roadmap",
                "Internal Team Alignment"
            ],
            process: [
                { title: "Stakeholder Interviews", desc: "Gathering insights from leadership and key team members." },
                { title: "Market Analysis", desc: "Auditing competitors and identifying whitespace opportunities." },
                { title: "Brand Positioning", desc: "Defining your unique value proposition and brand pillars." },
                { title: "Voice & Tone", desc: "Establishing how your brand speaks to the world." }
            ]
        },
        'prototyping': {
            title: "3D Prototyping",
            subtitle: "Visualizing perfection before production",
            image: "assets/img/service-prototyping.jpg",
            overview: `
                <p>See the future before you commit to it. Our 3D Prototyping service bridges the gap between digital design and physical reality. We create hyper-realistic 3D renders that allow you to visualize textures, finishes (like foils and spot UV), and lighting effects before a single unit is printed.</p>
                <p>For structural projects, we produce physical white samples and high-fidelity mockups. This allows for rigorous testing of assembly, durability, and shelf presence, reducing the risk of costly errors during full-scale mass production.</p>
            `,
            benefits: [
                "Risk Mitigation",
                "Marketing-Ready Visuals",
                "Accelerated Decision Making",
                "Physical Fit Testing"
            ],
            process: [
                { title: "3D Modeling", desc: "Building accurate digital models of the packaging structure." },
                { title: "Texture Mapping", desc: "Applying artwork and material finishes digitally." },
                { title: "Rendering", desc: "Generating photo-realistic images for marketing or review." },
                { title: "Physical Mockups", desc: "Creating tangible prototypes for hands-on validation." }
            ]
        },
        'sustainability': {
            title: "Sustainable Solutions",
            subtitle: "Eco-friendly packaging without compromise",
            image: "assets/img/service-sustainability.jpg",
            overview: `
                <p>Sustainability is no longer a luxury; it's a necessity. Consumers demand it, and the planet needs it. We help brands navigate the complex world of eco-friendly packaging, finding solutions that reduce environmental impact without sacrificing luxury or durability.</p>
                <p>We prefer a data-driven approach, analyzing materials for recyclability, biodegradability, and carbon footprint. Whether it's switching to soy-based inks, eliminating single-use plastics, or finding FSC-certified papers, we guide you toward choices that align with your brand values and regulatory requirements.</p>
            `,
            benefits: [
                "Reduced Carbon Footprint",
                "Regulatory Compliance",
                "Consumer Trust",
                "Material Innovation"
            ],
            process: [
                { title: "Material Audit", desc: "Assessing current packaging for environmental impact." },
                { title: "Sourcing", desc: "Identifying vendors for eco-friendly alternatives." },
                { title: "Lifecycle Analysis", desc: "Understanding the end-of-life journey of the package." },
                { title: "Certification Support", desc: "Helping you achieve labels like FSC or recyclable symbols." }
            ]
        },
        'production': {
            title: "Print Production",
            subtitle: "Flawless execution of your vision",
            image: "assets/img/service-production.jpg",
            overview: `
                <p>The best design in the world can be ruined by poor execution. Our Print Production Management service ensures that what you see on the screen is exactly what you get in your hand. We speak the language of printers, managing the technical details that designers often overlook.</p>
                <p>We handle file preparation, color management (ensuring brand colors match across different substrates), and press checks. We work closely with a network of trusted manufacturers to oversee quality control, specialty finishes (embossing, foiling), and final assembly.</p>
            `,
            benefits: [
                "Color Consistency",
                "Technical Accuracy",
                "Vendor Management",
                "Quality Assurance"
            ],
            process: [
                { title: "Pre-Press", desc: "Optimizing files for specific printing methods (offset, digital, flexo)." },
                { title: "Proofing", desc: "Reviewing hard proofs for color accuracy." },
                { title: "Press Checks", desc: "On-site supervision during the initial print run." },
                { title: "Logistics", desc: "Coordinating shipping and delivery timelines." }
            ]
        }
    };

    // Default to 'identity' if no ID or invalid ID
    const data = servicesData[serviceId] || servicesData['identity'];

    // Update DOM
    if (data) {
        document.getElementById('service-title').textContent = data.title;
        document.getElementById('service-subtitle').textContent = data.subtitle;
        document.getElementById('service-overview').innerHTML = data.overview;

        // Update Image (Use a placeholder if specific image doesn't exist, utilizing the data attribute if available)
        // For now, using a generic placeholder if the mapped file is just a string. 
        // In a real app, you'd check if file exists or use specific assets.
        // We will use a smart placeholder for now to ensure visibility.
        const imgElement = document.getElementById('service-image');
        imgElement.src = `https://placehold.co/1200x600/212529/FFF?text=${encodeURIComponent(data.title)}+Header`;
        // If user has provided assets, we could switch this. For now, placeholder confirms logic works.
        imgElement.style.display = 'block';

        // Update Benefits
        const benefitsList = document.getElementById('service-benefits');
        benefitsList.innerHTML = data.benefits.map(benefit =>
            `<li class="mb-3 d-flex align-items-center"><i class="bi bi-check-circle-fill text-primary me-2"></i>${benefit}</li>`
        ).join('');

        // Update Process
        const processContainer = document.getElementById('service-process');
        processContainer.innerHTML = data.process.map((step, index) => `
            <div class="d-flex mb-4">
                <div class="flex-shrink-0">
                    <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-weight:bold;">${index + 1}</div>
                </div>
                <div class="ms-3">
                    <h5 class="fw-bold mb-1">${step.title}</h5>
                    <p class="text-muted small mb-0">${step.desc}</p>
                </div>
            </div>
        `).join('');

        // Update page title
        document.title = `${data.title} - Service Details`;
    }
});
