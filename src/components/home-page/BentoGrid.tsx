import ScrollReveal from '../ScrollReveal'
import bentogrid from '@/assets/fapanese-bentogrid.png'

const BentoGrid = () => {
  return (
    <div>
        <ScrollReveal>
            <img srcSet={bentogrid} alt="FAPANESE Bento Grid" className="w-full h-full object-contain select-none"/>
        </ScrollReveal>
    </div>
  )
}

export default BentoGrid