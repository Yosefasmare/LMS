import Hero from './Hero'
import FeaturedBooks from './FeaturedBooks'
import { BookCardDataType } from '@/lib/types'
import { getLatestBooks } from '@/lib/prisma_func'

const MainSection = async () => {


    const latestBooks: BookCardDataType[] = await getLatestBooks()


  return (
     <main className="w-full flex flex-1 px-4 md:px-12 lg:px-24 flex-col">
        <Hero />
        <FeaturedBooks books={latestBooks}/>
      </main>
  )
}

export default MainSection