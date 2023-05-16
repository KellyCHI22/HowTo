import { RiEdit2Line } from 'react-icons/ri';
import Tag from '~/components/elements/Tag';
import { ReactComponent as SearchIllustration } from '~/assets/illustration_search.svg';
import { Link } from 'react-router-dom';
import Button from '~/components/elements/Button';

export default function SearchPage({ searchQuery }) {
  const tags = [
    'funny',
    'daily life',
    'cat',
    'animal',
    'plant',
    'cooking',
    'space',
    'school',
    'car',
    'traveling',
  ];
  return (
    <>
      <div className="m-5 md:my-12">
        <div className="mb-3">
          <h2 className="ml-2 font-slabo text-2xl text-teal-500">
            Latest tags
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 shadow-basic">
          {tags.map((tag, index) => {
            return <Tag key={index} label={tag} />;
          })}
        </div>
        <div className="mt-24 grid place-items-center">
          <SearchIllustration />
        </div>
        <Button
          loading={false}
          rounded
          primary
          className="fixed bottom-8 right-5 px-3 py-3 shadow-lg"
        >
          <Link to="/create">
            <RiEdit2Line className="text-2xl" />
          </Link>
        </Button>
      </div>
    </>
  );
}
