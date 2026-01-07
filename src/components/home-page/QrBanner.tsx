import qrBanner from '@/assets/qrBanner.jpg'
import ScrollReveal from '../ScrollReveal'

const QrBanner = () => {
    return (
        <div>
            <ScrollReveal>
                <img
                    src={qrBanner}
                    alt=""
                    className="w-full h-140 object-contain "
                />
            </ScrollReveal>
        </div>
    )
}

export default QrBanner