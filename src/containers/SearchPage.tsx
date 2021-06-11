import {useEffect, useState} from "react";

import { Input, Table } from "antd";

import { Pokemon } from "../hooks/usePokemon";

export default function Search() {
  const [pokemonList, pokemonListSet] = useState<Pokemon[]>([]);
  const [search, searchSet] = useState("Bul");

  useEffect(() => {
    fetch("/pokemon.json")
      .then(res => res.json())
      .then((pokemon: Pokemon[]) => pokemonListSet(pokemon))
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: {english: string}) => <strong>{name.english}</strong>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "age",
      render: (type: string[]) => type.join(", "),
    },
    {
      title: "Attack",
      dataIndex: "base",
      key: "base.Attack",
      render: (base: Record<string, number>) => base.Attack,
    },
    {
      title: "Defense",
      dataIndex: "base",
      key: "base.Defense",
      render: (base: Record<string, number>) => base.Defense,
    },
    {
      title: "Sp. Attack",
      dataIndex: "base",
      key: "base.Sp. Attack",
      render: (base: Record<string, number>) => base["Sp. Attack"],
    },
    {
      title: "Sp. Defense",
      dataIndex: "base",
      key: "base.Sp. Defense",
      render: (base: Record<string, number>) => base["Sp. Defense"],
    },
    {
      title: "Speed",
      dataIndex: "base",
      key: "base.Speed",
      render: (base: Record<string, number>) => base.Speed,
    },
  ];

  return (
    <>
      {pokemonList && (
        <>
          <Input
            value={search}
            onChange={(evt) => searchSet(evt.target.value)}
            style={{ marginBottom: "1em" }}
            placeholder="Search here..."
          />
          <Table
            dataSource={pokemonList.filter(({ name: { english } }) =>
              english.toLowerCase().includes(search.toLowerCase())
            )}
            columns={columns}
          />
        </>
      )}
    </>
  );
}