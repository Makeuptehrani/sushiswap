import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { classNames, Container, Typography } from '@sushiswap/ui'
import onsenImg from 'common/assets/onsen-img.png'
import {
  ProductArticles,
  ProductBackground,
  ProductFaq,
  ProductHero,
  ProductSectionTitle,
  ProductTechnicalDoc,
} from 'common/components'
import { DEFAULT_SIDE_PADDING } from 'common/helpers'
import { PeopleIcon, TradingIcon } from 'common/icons'
import { PRODUCTS_DATA } from 'common/productsData'
import { getLatestAndRelevantArticles, getProducts } from 'lib/api'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/legacy/image'
import { FC } from 'react'
import useSWR from 'swr'

import { ArticleEntity } from '.mesh'

const PRODUCT_SLUG = 'onsen'
const { color, productStats, buttonText, cards, faq } = PRODUCTS_DATA[PRODUCT_SLUG]

export const getStaticProps = async () => {
  const data = await getProducts({ filters: { slug: { eq: PRODUCT_SLUG } } })
  const product = data?.products?.data?.[0].attributes

  return { props: product }
}

const ProductPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  longName,
  url,
  description,
  slug,
  relevantArticleIds,
}) => {
  const { data, isValidating } = useSWR(
    [`/bentobox-articles`],
    async () => await getLatestAndRelevantArticles(slug, relevantArticleIds),
    { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false }
  )

  const latestArticles: ArticleEntity[] = data?.articles?.data ?? []
  const relevantArticles: ArticleEntity[] = data?.relevantArticles?.data ?? []
  const traderCards = cards.slice(0, 3)
  const projectCards = cards.slice(3)

  return (
    <Container maxWidth="6xl" className={classNames('mx-auto pt-10 pb-24', DEFAULT_SIDE_PADDING)}>
      <ProductBackground color={color} />
      <ProductHero
        productName={longName}
        productDescription={description}
        productUrl={url}
        buttonText={buttonText}
        buttonIcon={<ArrowRightCircleIcon width={20} height={20} />}
        image={<Image src={onsenImg} unoptimized alt="onsen-img" />}
        productStats={productStats}
      />

      <section className="py-10 sm:py-[75px]">
        <ProductSectionTitle
          className="text-center"
          title={`What is ${name}?`}
          subtitle="Onsen Farms bring new liquidity to Sushi, expand our pool offerings and foster exciting synergistic partnerships with other DeFi projects."
        />

        <div className="grid gap-2 sm:gap-6 mt-10 sm:mt-[70px]">
          <div className="flex items-center gap-4">
            <TradingIcon className="w-10 sm:w-[52px]" />
            <span className="font-bold text-lg sm:text-2xl">For Traders</span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-4 sm:gap-y-8">
            {traderCards.map((card, i) => (
              <div
                key={i}
                className="p-px sm:h-[420px] rounded-3xl"
                style={{
                  background: !i ? `linear-gradient(218.8deg, ${color} 2.35%, rgba(0, 0, 0, 0) 97.65%)` : 'unset',
                }}
              >
                <div className="p-8 md:p-12 h-full bg-[#212939] rounded-3xl">
                  <card.Icon />
                  <div className="mt-6 sm:mt-10">
                    <h3 className="text-xl sm:text-2xl font-bold">{card.title}</h3>
                  </div>
                  <div className="mt-2 sm:mt-4">
                    <p className="text-slate-400 text-xs sm:text-sm">{card.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-2 sm:gap-6 mt-10 sm:mt-20">
          <div className="flex items-center gap-4">
            <PeopleIcon className="w-10 sm:w-[52px]" />
            <span className="font-bold text-lg sm:text-2xl">For Projects</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-8">
            {projectCards.map((card, i) => (
              <div key={i} className="p-12 h-full bg-[#212939] rounded-3xl">
                <card.Icon />
                <div className="mt-11">
                  <Typography weight={700} variant="h3">
                    {card.title}
                  </Typography>
                </div>
                <div className="mt-5">
                  <Typography variant="sm" className="text-slate-400">
                    {card.subtitle}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductArticles
        title="Articles"
        subtitle="Read more about the latest releases"
        articles={latestArticles}
        productName={PRODUCT_SLUG}
        isLoading={isValidating}
      />
      <ProductArticles
        title={`Learn about ${name}`}
        subtitle="Check out our tutorials and explainers"
        articles={relevantArticles}
        productName={PRODUCT_SLUG}
        isLoading={isValidating}
      />
      <ProductTechnicalDoc color={color} secondaryColor="#FEC464" />
      <ProductFaq faq={faq} />
    </Container>
  )
}

export default ProductPage
