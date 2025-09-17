'use client';

import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { HuggingFace } from '@lobehub/icons';
import { authors } from "../info/authors";
import { motion } from "motion/react";

export function Header() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[20vh] w-full p-8 text-center"
      style={{
        backgroundImage: "url(/assets/head-bg.png)",
        backgroundPosition: "bottom",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-xs z-0 rounded-lg" />
      <div className="relative z-10">
        <motion.div
          className="text-5xl mb-4 font-bold"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <AuroraText colors={["#ff7b00", "#ffa200", "#ffc300", "#ffd000"]}>
              Nano-Consistent-150K
            </AuroraText>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {" "}Blog
          </motion.span>
        </motion.div>
        <div className="flex flex-wrap mt-6 items-center justify-center gap-3 mb-2 w-full max-w-[60%] mx-auto">
          {authors.map((author) => (
            <Link
              key={author.name}
              href={author.link}
              target="_blank"
              className="group flex items-center gap-2"
            >
              {/* <Avatar>
                <AvatarImage src={author.avatar_url} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar> */}
              <span className="relative font-medium">
                {author.name}
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="group"
          >
            <Link
              href="https://github.com/yejy53/Echo"
            >
                <FontAwesomeIcon icon={faGithub} className="size-5" />
                Github
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="group"
          >
            <Link
              href="https://github.com/PicoTrex/Awesome-Nano-Banana-images"
            >
                <FontAwesomeIcon icon={faGithub} className="size-5" />
                Awesome-Case
            </Link>
          </Button>
            <Button
            asChild
            variant="outline"
            size="sm"
            className="group"
          >
            <Link
              href="https://huggingface.co/yejy53/Echo"
            >
              <HuggingFace.Color className="size-5" />
              Dataset
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
