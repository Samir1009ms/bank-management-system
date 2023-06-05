import style from './design/style.module.scss'
import Charts from '../charts/chart'
import OverwievLeft from './OverwievLeft'

export default function Overwiev() {

    return (
        <div className={`${style.mainTop}  lg:flex grid w-full`}>
            <OverwievLeft />
            <div className={`${style.chart}`}>
                <Charts />
            </div>
        </div>
    )
}
