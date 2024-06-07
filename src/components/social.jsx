"use client";

const Social = () => {

    const handleSocial = (name, href) => {
        if (name !== "Mail") {
            window.open(href, '_blank');
        } else {
            const email = "venilsutariya7@gmail.com";
            const subject = "";

            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

            // Open the default email client with a new email
            window.open(mailtoLink, "_blank");
        }
    }

    return (
        <div className="flex flex-col justify-center py-44">
            <div className="flex justify-center opacity-75 gap-x-5 lg:gap-x-10">
                <button onClick={() => handleSocial("x", "https://twitter.com/SutariyaVenil")} className="hover:underline">
                    X
                </button>
                <button onClick={() => handleSocial("github", "https://github.com/venilsutariya")} className="hover:underline">
                    Github
                </button>
                <button onClick={() => handleSocial("Mail", "")} className="hover:underline">
                    Mail
                </button>
            </div>
            <div className="flex justify-center mt-10">
                <a href="https://shilp.co" className="hover:underline" target="_blank">
                    <span className="opacity-75 bg-gradient-to-tr from-[#22ff9b] via-[#00b91c] to-[#ffff00] text-transparent bg-clip-text font-[500] text-xl hover:opacity-100 pb-2 transition-all">@shilp.co</span>
                </a>
            </div>
        </div>
    );
}

export default Social;