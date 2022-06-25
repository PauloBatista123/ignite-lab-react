import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';

interface Props {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
  key: string;
}

export function Lesson({title, slug, availableAt, type, key}: Props) {
  const { slugParms } = useParams<{ slugParms: string}>();

  const isActive = slugParms === slug;
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormat = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'K'h'mm",{
    locale: ptBR
  })
  return(
      <Link to={`/event/lesson/${slug}`} className='group'>
        <span className="text-gray-300">
          {availableDateFormat}
        </span>
        <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActive ? 'bg-green-500' : ''}`}>
          <header className="flex items-center justify-between">

            {isLessonAvailable ? (
              <span className="text-sm text-blue-500 font-medium flex gap-2">
                <CheckCircle size={20}/>
                Conteudo liberado
              </span>
            ): (
              <span className="text-sm text-orage-500 font-medium flex gap-2">
                <Lock size={20}/>
                Em breve
              </span>
            )}            

            <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
              {type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>

          <strong className={`block mt-5  ${isActive ? 'text-white' : 'text-gray-200'}`}>
            {title}
          </strong>
        </div>
      </Link>
  )
}