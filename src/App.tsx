import './App.css'
import { ImageMarquee } from '@/components/image-marquee'
import { Layout } from '@/components/layout'
import { ThreeDMarqueeHeader } from "@/components/3d-marquee";
import { ChartDashboard } from '@/components/chart-dashboard'
import { randomSelectImages, splitImagesIntoGroups } from '@/data/load-image'

import conflictImages from '@/assets/conflict_images.json';
import instructionImages from '@/assets/instucions_images.json';
import multiImages from '@/assets/multi_images.json';
import conflictImages_1024_1024 from '@/assets/conflict_1024_1024_images.json';
import conflictImages_1024_1536 from '@/assets/conflict_1024_1536_images.json';
import conflictImages_1536_1024 from '@/assets/conflict_1536_1024_images.json';
import instructionImages_1024_1024 from '@/assets/instucions_1024_1024_images.json';
import instructionImages_1536_1024 from '@/assets/instucions_1536_1024_images.json';
import multiImages_1024_1024 from '@/assets/multi_1024_1024_images.json';
import multiImages_1024_1536 from '@/assets/multi_1024_1536_images.json';
import multiImages_1536_1024 from '@/assets/multi_1536_1024_images.json';

function App() {

  // random select images from each type
  const num_images = 15
  const conflict_images_selected = randomSelectImages(conflictImages, num_images)
  const instruction_images_selected = randomSelectImages(instructionImages, num_images)
  const multi_images_selected = randomSelectImages(multiImages, num_images)
  const all_images = [...conflict_images_selected, ...instruction_images_selected, ...multi_images_selected]

  // split images into groups
  const conflict_images_groups_1024_1024 = splitImagesIntoGroups(conflictImages_1024_1024, 2)
  const conflict_images_groups_1024_1536 = splitImagesIntoGroups(conflictImages_1024_1536, 2)
  const conflict_images_groups_1536_1024 = splitImagesIntoGroups(conflictImages_1536_1024, 1)
  const instruction_images_groups_1024_1024 = splitImagesIntoGroups(instructionImages_1024_1024, 3)
  const instruction_images_groups_1536_1024 = splitImagesIntoGroups(instructionImages_1536_1024, 1)
  const multi_images_groups_1024_1024 = splitImagesIntoGroups(multiImages_1024_1024, 2)
  const multi_images_groups_1024_1536 = splitImagesIntoGroups(multiImages_1024_1536, 1)
  const multi_images_groups_1536_1024 = splitImagesIntoGroups(multiImages_1536_1024, 1)

  return (
    <>
    <ThreeDMarqueeHeader images={all_images} />
    <div id="data-statistics" className="pt-5 w-[100%] flex items-center justify-center bg-[#191919]">
      <div className="w-[80%] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-[#F8F8F8] text-center">Data Statistics</h2>
        <ChartDashboard />
      </div>
    </div>
    <Layout>

    <div className="flex items-center mb-5">
      <div className="h-[2.5em] w-2 bg-gradient-to-b from-[#ffb9cb] to-[#fe487d] rounded mr-3" />
      <h2 id="conflict" className="text-3xl font-bold text-[#F8F8F8]">Imagination</h2>
    </div>
    {conflict_images_groups_1024_1024.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    {conflict_images_groups_1024_1536.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    {conflict_images_groups_1536_1024.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    <br/>

    <div className="flex items-center mb-5">
      <div className="h-[2.5em] w-2 bg-gradient-to-b from-[#aad6f9] to-[#04aff1] rounded mr-3" />
      <h2 className="text-3xl font-bold text-[#F8F8F8]">Multi-Reference</h2>
    </div>
    {multi_images_groups_1024_1024.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    {multi_images_groups_1024_1536.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    {multi_images_groups_1536_1024.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    <br/>

    <div className="flex items-center mb-5">
      <div className="h-[2.5em] w-2 bg-gradient-to-b from-[#beb8fe] to-[#9264c9] rounded mr-3" />
      <h2 className="text-3xl font-bold text-[#F8F8F8]">Instruction Following</h2>
    </div>
    {instruction_images_groups_1024_1024.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
    {instruction_images_groups_1536_1024.map((group, index) => (
      <ImageMarquee key={index} images={group} />
    ))}
  </Layout>
  </>
  )
}

export default App
