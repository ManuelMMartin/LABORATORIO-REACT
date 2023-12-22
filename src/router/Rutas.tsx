import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { switchRoutes } from "./routes";
import { GithubList } from "../components/GithubList/GithubList";
import { MemberInfo } from "../components/GithubList/MemberInfo";
import { Header } from "../components/Header";
import { SearchProvider } from "../components/GithubList/SearchContext";
import { SelectMenu } from "../components/SelectMenu";
import { RickList } from "../components/Rick&Morty/RickList";


export const Rutas: React.FC = () => {


  return (<>
    <BrowserRouter>
      <Header />
      <SearchProvider>
        <Routes>
          <Route path={switchRoutes.root} element={<SelectMenu />} />
          <Route path={switchRoutes.list} element={<GithubList />} />
          <Route path={switchRoutes.detail} element={<MemberInfo />} />
          <Route path={switchRoutes.rick} element={<RickList />} />
          <Route path="*" element={<h4>404 Not found</h4>} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  </>
  );
};