import { SiArxiv, SiHuggingface, SiGithub } from "react-icons/si";
import { BoxReveal } from "@/components/ui/box-reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function TitleReveal() {
  return (
    <div className="z-20 max-w-4lg items-center justify-center overflow-hidden mt-[-13vw]">
      <div className="flex items-center justify-center">
        <img src="./logo.png" alt="logo" className="w-50 h-50" />
      </div>
      <BoxReveal boxColor={"#6D83F2"} duration={0.5}>
        <h1 className="flex text-[5rem] font-semibold text-[#F8F8F8]">
        Echo-4o-Image<span className="text-[#6A98F0]">.</span>
        </h1>
      </BoxReveal>
      
          <BoxReveal boxColor={"#6D83F2"} duration={0.5}>
            <h2 className="mt-[.5rem] text-[2rem] text-[#F8F8F8]">
              Dataset Gallery of {" "}
              <span className="text-[#6A98F0]">Echo-4o-Image</span>
            </h2>
          </BoxReveal>

          {/* <BoxReveal boxColor={"#6D83F2"} duration={0.5}>
            <div className="mt-6">
              <p className="text-[#F8F8F8]">
                sss. <br />
              </p>
            </div>
          </BoxReveal> */}

      <div className="flex items-center gap-4 mt-6">
        <BoxReveal boxColor={"#6D83F2"} duration={0.5}>
          <InteractiveHoverButton onClick={() => {
              const el = document.getElementById('data-statistics');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Explore</InteractiveHoverButton>
        </BoxReveal>
        
        {/* 图标按钮组 */}
        <div className="flex items-center gap-3">
          <a 
            href="https://arxiv.org/abs/your-paper" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-blue-400 transition-colors duration-200"
          >
            <SiArxiv className="w-6 h-6" />
          </a>
          
          <a 
            href="https://github.com/your-repo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-blue-400 transition-colors duration-200"
          >
            <SiGithub className="w-6 h-6" />
          </a>

          <a 
            href="https://huggingface.co/your-model" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-blue-400 transition-colors duration-200"
          >
            <SiHuggingface className="w-6 h-6" />
          </a>

        </div>
      </div>
    </div>
  );
}
