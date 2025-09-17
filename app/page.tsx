'use client';

import Link from "next/link";
import Image from "next/image";
import { TextInitial, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "@/components/web-ui/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const easeOut = [0.1, 0.5, 0.3, 0.5] as const;

  const contentEnter = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut },
  } as const;

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, ease: easeOut },
  } as const;

  const imageReveal = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: easeOut },
  } as const;

  return (
    <motion.div
      className="font-sans items-center justify-items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <Header />
      <motion.div className="mx-auto max-w-5xl p-4" {...contentEnter}>
        <motion.h2 className="text-2xl font-bold mb-4" {...fadeInUp}>
          Introduction
        </motion.h2>
        <motion.p className="text-base leading-7" {...fadeInUp}>
          Nano-banana demonstrates outstanding capabilities in image generation and world knowledge, with particularly strong performance in identity consistency. In contrast, even OpenAI&#39;s GPT-4o and the most advanced open-source model, Qwen-Image, still fall noticeably short on consistency tasks. The consistency task refers to preserving the same individual&#39;s facial identity across diverse editing scenarios—such as background changes, action modifications, or style shifts—which has emerged as a critical capability for modern image generation models. 
          <br />
          In our prior work (<Link href="https://github.com/yejy53/Echo" style={{ color: '#28affa' }}
          className="hover:underline"> Echo-4o </Link>), we highlighted the advantages of leveraging GPT-4o as a source of high-quality synthetic data—superior to natural image datasets in generating scarce samples, achieving clean instruction alignment, and composing multi-reference image sets. Building upon the insights from our previous work, we further leverage Nano-Banana to construct a large-scale, high-quality dataset that preserves individual identity across diverse and complex editing scenarios.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_intro.png"
            alt="case introduction"
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        <motion.p className="text-base leading-7" {...fadeInUp}>
          Today, we introduce <span className="font-semibold">Nano-consistent-150k</span>, a large-scale dataset of over 100k samples generated with the recent, stronger Nano-banana model. The dataset spans eight types of image editing and multi-reference composition tasks. A key feature is its remarkable <span className="font-semibold">identity consistency</span>: for a single portrait, more than 35 distinct editing outputs are provided across diverse tasks and instructions. By anchoring on consistent human identities, the dataset enables the construction of <span className="font-semibold">interleaved data</span>, facilitating research on both complex scene editing and identity preservation. 
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_all.png"
            alt="case introduction"
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        <motion.p className="mt-2 mb-2 text-base leading-7" {...fadeInUp}>
          We release Nano-consistent-100k openly to support the community&#39;s development of image generation and unified models. In addition, we are conducting lightweight fine-tuning on Qwen-Image for editing tasks, and the resulting model weights will be released later this month.
          <br />
          As shown in the Figure, the Nano-consistent-150k dataset comprises a total of 159,492 samples, including 120k single-image editing instances and 40k multi-reference generation samples, spanning eight distinct sub-tasks. 
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/data.png"
            alt="case introduction"
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        <motion.p className="text-base leading-7" {...fadeInUp}>
          We began by downloading over 10k publicly available portrait images from Pixabay, followed by automated filtering with GPT-5-mini to ensure the presence of clear facial features. After filtering, approximately 4,000 portraits were retained as the base identity set for consistency tasks. In addition, we manually collected 500 anime-style character illustrations to further supplement the dataset. 
          <br />
          Based on these identities, we drafted initial task-specific text instructions and employed Nano-banana to generate synthetic images. Details of each sub-task are provided in the subsequent task descriptions. While Nano-banana exhibits strong generative capabilities, it can still suffer from instruction non-compliance or visible cut-and-paste artifacts. To address this, we applied GPT-5-mini again to filter the outputs.
          <br />
          To further diversify and refine the instructions, we performed instruction rewriting and optimization conditioned on the input images and generated results. Two instruction formats were designed: Training-oriented instructions — providing detailed descriptions of image content and the applied edits, facilitating robust model training. User-oriented instructions — concise single-sentence edit commands, better aligned with practical user input scenarios.
        </motion.p>
        <motion.div {...fadeInUp}>
          <Alert className="mt-4 mb-4" variant="default">
            <TextInitial />
            <AlertTitle>Long:</AlertTitle>
            <AlertDescription>
              Change the pose of the bearded man wearing red-accent sunglasses. In the original he tilts his head with one arm lowered/hand near his head; in the new version both arms should be crossed at his waist and his torso/head slightly adjusted to match, while keeping his appearance, clothing, facial hair, sunglasses and the plain wall background exactly the same.
            </AlertDescription>
            <TextInitial className="mt-2" />
            <AlertTitle className="mt-2">Short:</AlertTitle>
            <AlertDescription>
              Change the man&#39;s pose to crossing his hands across his waist.
            </AlertDescription>
          </Alert>
        </motion.div>
        {/* action task */}
        <motion.p className="text-base leading-7" {...fadeInUp}>
            <span className="font-semibold">Action Task:</span> We randomly define a set of action instructions that require the model to modify a subject&#39;s pose while preserving the original identity details and background. This enables the generation of diverse derivative actions. Examples include making a “Yes” gesture, crossing the arms, or introducing new props such as hats or sunglasses to create varied action expressions.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_action.png"
            alt="action case introduction "
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        {/* background task */}
        <motion.p className="text-base leading-7" {...fadeInUp}>
            <span className="font-semibold">Background Task:</span> We define approximately <span className="font-semibold">250 different scene locations</span>, covering landmarks, natural landscapes, and common indoor and outdoor environments. The task requires replacing the original background with a new setting while preserving the subject&#39;s identity. Examples include switching the background to an indoor photo studio, a snowy mountain outdoors, or various scenic landmarks.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_background.png"
            alt="background case introduction "
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        {/* hairstyle task */}
        <motion.p className="text-base leading-7" {...fadeInUp}>
            <span className="font-semibold">Hairstyle Task:</span> We further explore the task of <span className="font-semibold">hairstyle and hair color modification</span> on portrait data, leveraging Nano-banana to edit a subject’s hair details. Examples include changing straight bangs to wavy curls or a bun, and altering black hair to blonde, red, or other colors.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_hairstyle.png"
            alt="hairstyle case introduction "
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        {/* Temporal task */}
        <motion.p className="text-base leading-7" {...fadeInUp}>
            <span className="font-semibold">Temporal Task:</span> We place portrait data within different historical or temporal contexts, requiring that both clothing styles and background details align with the designated era. For example, a subject may be rendered in a 1905 daily-life setting or situated in the millennial environment of the year 2000.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_temporal.png"
            alt="temporal case introduction "
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        {/* Human Interaction task */}
        <motion.p className="text-base leading-7" {...fadeInUp}>
            <span className="font-semibold">Human Interaction Task:</span> We randomly select 2–4 images from the base identity set and use GPT to generate interaction-oriented instructions. Rather than merely placing individuals side by side, the task emphasizes interpersonal actions and interactions. Examples include two people drinking coffee and having a conversation, or a group of four forming a band and performing together. These instructions are then used with Nano-banana to synthesize images that capture rich interactive semantics.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_human.png"
            alt="human interaction case introduction "
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>
        {/* OOTD task */}
        <motion.p className="text-base leading-7" {...fadeInUp}>
            <span className="font-semibold">OOTD Task:</span> We collect clothing items from online sources and randomly combine 2–6 garments with a portrait for outfit display. The generated samples are required to preserve facial identity consistency, while incorporating pose variations to better highlight the details and presentation of the clothing.
        </motion.p>
        <motion.div {...imageReveal}>
          <Image
            src="assets/case_ootd.png"
            alt="ootd case introduction "
            width={2456}
            height={593}
            priority
            className="mt-4 mb-4 rounded-lg"
          />
        </motion.div>

        <motion.p className="text-base leading-7" {...fadeInUp}>
          We will release the <span className="font-semibold">Nano-consistent-100k</span> dataset to foster future research on image generation and unified models. In addition, we will provide the <span className="font-semibold">Qwen-Image LoRA weights</span> fine-tuned on this dataset in the near future, offering further support for advancing identity consistency and complex editing capabilities.
        </motion.p>
        <motion.div {...fadeInUp}>
          <Alert className="mt-4 mb-4" variant="default">
            <Newspaper />
            <AlertTitle>Citation</AlertTitle>
            <AlertDescription>
              <pre className="mt-2 whitespace-pre-wrap break-words rounded-md bg-muted/60 p-3 text-sm font-mono leading-6 text-foreground/80">
                {`@article{ye2025echo4o,
    title={Echo-4o: Harnessing the Power of GPT-4o Synthetic Images for Improved Image Generation},
    author={Junyan Ye, Dongzhi Jiang, Zihao Wang, Leqi Zhu, Zhenghao Hu, Zilong Huang, Jun He, Zhiyuan Yan, Jinghua Yu, Hongsheng Li, Conghui He, Weijia Li},
    journal={https://arxiv.org/abs/2508.09987},
    year={2025},
}`}
              </pre>
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
