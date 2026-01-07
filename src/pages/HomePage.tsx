
import AlphabetLearning from '@/components/home-page/AlphabetLearning'
import AIFeature from '@/components/home-page/AIFeature'
import BentoGrid from '@/components/home-page/BentoGrid'
import FlashCardFeature from '@/components/home-page/FlashCardFeature'
import { Hero } from '@/components/home-page/Hero'
import HomeInfo from '@/components/home-page/HomeInfo'
import QrBanner from '@/components/home-page/QrBanner'

const HomePage = () => {

  return (
    <>
      <Hero />
      <HomeInfo />
      <AlphabetLearning/>
      <FlashCardFeature />
      <AIFeature />
      <BentoGrid />
      <QrBanner/>
    </>

  )
}

export default HomePage