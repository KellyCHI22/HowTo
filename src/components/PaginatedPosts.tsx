import { useEffect, useState } from 'react';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import HowToItem from './HowtoItem';
import { useMediaQuery } from 'react-responsive';
import { Post } from '~/store/apis/postsApi';

export type PaginatedPostsProps = {
  posts: Post[];
  postsPerPage: number;
  currentPage: number;
  handleCurrentPageChange: (page: number) => void;
};

export default function PaginatedPosts({
  posts,
  postsPerPage,
  currentPage,
  handleCurrentPageChange,
}: PaginatedPostsProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemOffset(currentPage * postsPerPage);
  }, [currentPage]);

  const endOffset = itemOffset + postsPerPage;
  const currentPosts = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * postsPerPage) % posts.length;
    setItemOffset(newOffset);
    handleCurrentPageChange(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentPosts &&
        currentPosts.map((post: Post) => (
          <HowToItem key={post.id} post={post} />
        ))}
      {posts.length > 0 && (
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<RiArrowRightSLine className="text-xl" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={isMobile ? 1 : 2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            forcePage={currentPage}
            previousLabel={<RiArrowLeftSLine className="text-xl" />}
            renderOnZeroPageCount={null}
            containerClassName="flex gap-3 mt-5 mb-16 md:my-5 justify-center w-full"
            pageLinkClassName="border border-teal-500 block w-8 h-8 grid place-items-center rounded-full"
            pageClassName="text-teal-500"
            previousLinkClassName="border border-teal-500 block w-8 h-8 grid place-items-center rounded-full"
            previousClassName="text-teal-500"
            nextLinkClassName="border border-teal-500 block w-8 h-8 grid place-items-center rounded-full"
            nextClassName="text-teal-500"
            activeClassName="text-white bg-teal-500 rounded-full"
          />
        </div>
      )}
    </>
  );
}
