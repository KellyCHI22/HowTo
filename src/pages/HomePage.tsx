import { Link } from 'react-router-dom';
import Button from '~/components/elements/Button';
import { ReactComponent as CreativeIllustration } from '~/assets/illustration_creative.svg';
import { ReactComponent as IdeaIllustration } from '~/assets/illustration_idea.svg';
import {
  RiArrowRightLine,
  RiLightbulbFlashFill,
  RiListOrdered,
  RiTeamFill,
  RiExternalLinkLine,
  RiGithubFill,
} from 'react-icons/ri';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

import HowToItem, { SkeletonHowtoItem } from '~/components/HowtoItem';
import { useFetchPostsQuery } from '~/store';
import HowtoItem from '~/components/HowtoItem';
import { useState } from 'react';
import { Post } from '~/store/apis/postsApi';
import Spinner from '~/components/elements/Spinner';

export default function HomePage() {
  const {
    data: postsData,
    error: errorPostsData,
    isFetching: isFetchingPostsData,
  } = useFetchPostsQuery();

  if (errorPostsData) {
    console.log(errorPostsData);
  }

  return (
    <>
      <div className="container my-10 space-y-10 md:space-y-20">
        <HeroSection />
        <FeaturesSection />
        {postsData && !isFetchingPostsData ? (
          <>
            <RandomHowtoSection postsData={postsData} />
            <LatestHowtoSection postsData={postsData} />
          </>
        ) : (
          <Spinner />
        )}
      </div>
      <footer className="bg-teal-500 py-3 text-sm text-white lg:flex lg:justify-center lg:gap-5">
        <p className="mx-auto w-fit lg:mx-0">
          Milano illustration assets from{' '}
          <a href="https://www.streamlinehq.com/" className="underline">
            Streamline
            <RiExternalLinkLine className="inline text-lg" />
          </a>
        </p>
        <p className="mx-auto flex w-fit items-center lg:mx-0">
          Copyright © 2023
          <a href="https://github.com/KellyCHI22" className="ml-1 underline">
            Kelly CHI
            <RiGithubFill className="ml-1 inline-block text-xl" />
          </a>
        </p>
      </footer>
    </>
  );
}

function HeroSection() {
  return (
    <section
      className="pt-16 md:flex md:items-center md:justify-center"
      aria-label="hero-section"
    >
      <div className="text-center md:mr-10 md:text-left">
        <h1 className="mb-1 text-4xl font-extrabold md:mb-3 md:text-6xl">
          Unlock Your{'  '}
          <span className="my-1 inline-block text-teal-500 md:block">
            Creativity
          </span>
        </h1>
        <div className="text-lg font-thin md:ml-1 md:text-xl">
          <p>Create, Share and Connect</p>
          <p>with your unique how-to ideas</p>
        </div>
        <Link to="/howtos">
          <Button
            loading={false}
            basic
            primary
            className="mx-auto my-7 mb-10 py-3 font-bold md:mx-0 md:mb-0"
          >
            Start Exploring
            <RiArrowRightLine className="text-xl" />
          </Button>
        </Link>
      </div>
      <CreativeIllustration className="mx-auto h-[250px] text-teal-600 md:mx-0 md:h-full md:w-[350px]" />
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      className="space-y-5 md:grid md:grid-cols-3 md:space-y-0 lg:mx-10"
      aria-label="features-section"
    >
      <div className="mx-3 rounded-xl bg-white p-8 text-center shadow-basic">
        <RiLightbulbFlashFill className="mx-auto text-7xl text-teal-500" />
        <h3 className="my-3 text-xl font-bold">Solutions to Anything</h3>
        <p className="font-thin">
          Unlock a world of possibilities and never feel stuck again. The only
          limit is your imagination!
        </p>
      </div>
      <div className="mx-3 rounded-xl bg-white p-8 text-center shadow-basic">
        <RiListOrdered className="mx-auto text-7xl text-teal-500" />
        <h3 className="my-3 text-xl font-bold">Step-By-Step Guide</h3>
        <p className="font-thin">
          Each how-to guide provides easy-to-follow step-by-step instructions to
          help you solve problems with confidence.
        </p>
      </div>
      <div className="mx-3 rounded-xl bg-white p-8 text-center shadow-basic">
        <RiTeamFill className="mx-auto text-7xl text-teal-500" />
        <h3 className="my-3 text-xl font-bold">Inspire and Be Inspired</h3>
        <p className="font-thin">
          Join our vibrant community of learners and creators. Create a
          community of knowledge-sharing and empowerment.
        </p>
      </div>
    </section>
  );
}

function RandomHowtoSection({ postsData }: { postsData: Post[] }) {
  const [randomHowto, setRandomHowto] = useState<null | Post>(null);
  const getRandomHowto = () => {
    if (postsData) {
      const randomIndex = Math.floor(Math.random() * postsData.length);
      const howto = postsData[randomIndex];
      setRandomHowto(howto);
    }
  };

  return (
    <section
      className="text-center md:my-10 lg:mx-28"
      aria-label="get-inspired-section"
    >
      <h2 className="text-3xl font-extrabold text-teal-500">Get Inspired!</h2>
      <p className="mx-10 my-3 font-thin text-gray-900">
        Click the dice button below to get a random How-to
      </p>
      <button
        onClick={getRandomHowto}
        className="rounded-full bg-teal-500 p-3 text-white shadow-basic hover:bg-teal-600 md:hidden"
      >
        <GiPerspectiveDiceSixFacesRandom className="text-8xl" />
      </button>
      <div className="my-5 items-center text-left md:flex md:gap-8">
        <button
          onClick={getRandomHowto}
          className="hidden rounded-full bg-teal-500 p-3 text-white shadow-basic hover:bg-teal-600 md:block"
        >
          <GiPerspectiveDiceSixFacesRandom className="text-8xl" />
        </button>
        <div className="flex-1">
          {randomHowto ? (
            <HowToItem post={randomHowto} />
          ) : (
            <SkeletonHowtoItem />
          )}
        </div>
      </div>
    </section>
  );
}

function LatestHowtoSection({ postsData }: { postsData: Post[] }) {
  let latestHowTos;
  if (postsData) {
    latestHowTos = [...postsData]
      ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 2);
  }

  return (
    <section
      className="relative text-center md:items-center lg:mx-24 lg:grid lg:grid-cols-5 lg:gap-3 lg:pb-24"
      aria-label="latest-howtos-section"
    >
      <div className="flex-2 lg:col-span-2">
        <h2 className="text-3xl font-extrabold text-teal-500 lg:mb-10">
          Latest How-tos...
        </h2>
        <IdeaIllustration className="mx-auto hidden text-teal-600 lg:block lg:scale-125" />
      </div>
      <div className="lg:col-span-3">
        <div className="my-5 space-y-3 text-left">
          {latestHowTos?.map((howto) => (
            <HowtoItem post={howto} key={howto.id} />
          ))}
        </div>
        <Link to="/howtos">
          <Button loading={false} basic outline className="absolute right-0">
            Explore more ideas
            <RiArrowRightLine className="text-xl" />
          </Button>
        </Link>
        <IdeaIllustration className="mx-auto mt-20 text-teal-600 lg:hidden" />
      </div>
    </section>
  );
}
