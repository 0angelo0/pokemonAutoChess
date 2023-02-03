import React from "react"
import PokemonFactory from "../../../../../models/pokemon-factory"
import { PrecomputedTypePokemon } from "../../../../../types"
import { Synergy } from "../../../../../types/enum/Synergy"
import {
  SynergyName,
  SynergyDetail
} from "../../../../../types/strings/Synergy"
import PRECOMPUTED_TYPE_POKEMONS from "../../../../../models/precomputed/type-pokemons.json"
import { Pkm } from "../../../../../types/enum/Pokemon"
import { EffectName } from "../../../../../types/strings/Effect"
import { TypeTrigger, RarityColor } from "../../../../../types/Config"
import { useAppSelector } from "../../../hooks"
import { getPortraitSrc } from "../../../utils"
import SynergyIcon from "../icons/synergy-icon"
import { SynergyDescription } from "./synergy-description"

const precomputed = PRECOMPUTED_TYPE_POKEMONS as PrecomputedTypePokemon

export default function SynergyDetailComponent(props: {
  type: Synergy
  value: number
}) {
  const additionalPokemons = useAppSelector(
    (state) => state.game.additionalPokemons
  )
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SynergyIcon type={props.type} size="40px" />
        <h3>{SynergyName[props.type].eng}</h3>
      </div>

      {SynergyDetail[props.type].map((d, i) => {
        return (
          <div
            key={EffectName[d]}
            style={{
              color:
                TypeTrigger[props.type][i] == props.value ? "#fff" : "#e8e8e8",
              backgroundColor:
                TypeTrigger[props.type][i] == props.value
                  ? "#54596b"
                  : "rgba(84, 89, 107,0)",
              border:
                TypeTrigger[props.type][i] == props.value
                  ? "4px solid black"
                  : "none",
              borderRadius: "12px",
              padding: "5px"
            }}
          >
            <h5 style={{ fontSize: "1.3vw" }}>
              ({TypeTrigger[props.type][i]}) {EffectName[d]}
            </h5>
            <SynergyDescription effect={d} />
          </div>
        )
      })}
      <div style={{ display: "flex" }}>
        {precomputed[props.type].pokemons.map((p) => {
          const pokemon = PokemonFactory.createPokemonFromName(p as Pkm)
          const s = { border: "3px solid " + RarityColor[pokemon.rarity] }
          return <img key={p} style={s} src={getPortraitSrc(pokemon.index)} />
        })}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        {precomputed[props.type].mythicalPokemons.map((p) => {
          const pokemon = PokemonFactory.createPokemonFromName(p as Pkm)
          const s = { border: "3px solid " + RarityColor[pokemon.rarity] }
          return <img key={p} style={s} src={getPortraitSrc(pokemon.index)} />
        })}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        {precomputed[props.type].additionalPokemons.map((p) => {
          if (additionalPokemons.includes(p)) {
            const pokemon = PokemonFactory.createPokemonFromName(p as Pkm)
            const s = { border: "3px solid " + RarityColor[pokemon.rarity] }
            return <img key={p} style={s} src={getPortraitSrc(pokemon.index)} />
          } else {
            return null
          }
        })}
      </div>
    </div>
  )
}
