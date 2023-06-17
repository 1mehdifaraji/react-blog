import { FC } from "react";
import { Link } from "react-router-dom";

import { Button, Search } from "components";

interface HeaderProps {
  search: string;
  setSearch: (e: any) => void;
}

const Header: FC<HeaderProps> = ({ search, setSearch }) => (
  <div className="flex items-center justify-between my-5">
    <Search
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      placeholder="Search"
    />
    <Link to="/new">
      <Button>Add new post</Button>
    </Link>
  </div>
);

export default Header;
