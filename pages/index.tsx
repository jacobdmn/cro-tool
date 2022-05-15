import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/button/Button'
import Script from 'next/script'

const styles = {
  auditWrapper:
    'bg-main_color px-7 py-10 flex flex-col gap-4 rounded w-[28rem]',
}
export const auditButtons: { id: number; text: string; slug: string }[] = [
  { id: 1, text: 'Home Page Audit', slug: 'home-page-audit' },
  { id: 2, text: 'Landing Page Audit', slug: 'landing-page-audit' },
  { id: 3, text: 'Product Page Audit', slug: 'product-page-audit' },
  { id: 4, text: 'Cart Page Audit', slug: 'cart-page-audit' },
]
const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/80 py-2 ">
      <Head>
        <title>CRO Tool | Rocket Conversions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center text-white">
        <div className={styles.auditWrapper}>
          <h1 className="mb-8 text-xl">Choose What You Want To Audit</h1>
          {auditButtons.map((btn) => (
            <Link key={btn.id} href={`/${btn.slug}`} passHref>
              <a>
                <Button key={btn.id} className="w-full" text={btn.text} />
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
