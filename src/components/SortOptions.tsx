import { RiArrowDownSFill } from 'react-icons/ri';

export type SortOptionProps = {
  onSortOptionSelect: (option: string) => void;
};

export default function SortOption({ onSortOptionSelect }: SortOptionProps) {
  return (
    <div className="relative">
      <select
        id="sort-options"
        className="cursor-pointer appearance-none rounded-full border border-teal-500 bg-white text-teal-500 placeholder-teal-500 focus:border-teal-500 focus:border-transparent focus:ring-2 focus:ring-teal-400"
        onChange={(e) => onSortOptionSelect(e.target.value)}
        defaultValue="latest"
      >
        <option value="none">Sort By</option>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="popularity">Popularity</option>
      </select>
      <RiArrowDownSFill className="pointer-events-none absolute right-1.5 top-[0.3rem] text-3xl text-teal-500" />
    </div>
  );
}
