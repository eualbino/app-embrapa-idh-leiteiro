// External Libraries
import React from "react";
import { View } from "react-native";

// Components
import AreaInput from "./components/AreaInputForm";
import RebanhoInput from "./components/RebanhoForm";
import ProducaoLeiteiraInput from "./components/ProducaoLeiteiraForm";
import ComposicaoLeiteInput from "./components/ComposicaoLeiteForm";
import ConsumoDiarioInput from "./components/ConsumoDiarioForm";
import EnergiaEletricaInput from "./components/EnergiaEletricaForm";
import LegislacaoAmbientalInput from "./components/LegislacaoAmbientalForm";
import SistemaProducaoInput from "./components/SistemaProducaoForm";
import LocalizacaoInput from "./components/LocalizacaoForm";

// Types
import { FormSectionsProps } from "./types";

export const FormSections: React.FC<FormSectionsProps> = ({
  form,
  handleFormChange,
  renderRadioButton,
}) => {
  return (
    <View>
      <LocalizacaoInput
        pais={form.pais}
        setPais={(value) => handleFormChange({ pais: value })}
        estado={form.estado}
        setEstado={(value) => handleFormChange({ estado: value })}
        cidade={form.cidade}
        setCidade={(value) => handleFormChange({ cidade: value })}
      />

      <SistemaProducaoInput
        sistemaProducao={form.sistemaProducao}
        setSistemaProducao={(value) =>
          handleFormChange({ sistemaProducao: value })
        }
        outroSistemaProducao={form.outroSistemaProducao}
        setOutroSistemaProducao={(value) =>
          handleFormChange({ outroSistemaProducao: value })
        }
        renderRadioButton={renderRadioButton}
      />

      <AreaInput
        areaPropriedade={form.areaPropriedade}
        setAreaPropriedade={(value) =>
          handleFormChange({ areaPropriedade: value })
        }
        areaPastagem={form.areaPastagem}
        setAreaPastagem={(value) => handleFormChange({ areaPastagem: value })}
        areaSilagem={form.areaSilagem}
        setAreaSilagem={(value) => handleFormChange({ areaSilagem: value })}
      />

      <RebanhoInput
        vacasLactacao={form.vacasLactacao}
        setVacasLactacao={(value) => handleFormChange({ vacasLactacao: value })}
        vacasSecas={form.vacasSecas}
        setVacasSecas={(value) => handleFormChange({ vacasSecas: value })}
        novilhas={form.novilhas}
        setNovilhas={(value) => handleFormChange({ novilhas: value })}
        bezerros={form.bezerros}
        setBezerros={(value) => handleFormChange({ bezerros: value })}
        garrotes={form.garrotes}
        setGarrotes={(value) => handleFormChange({ garrotes: value })}
        bulls={form.bulls}
        setBulls={(value) => handleFormChange({ bulls: value })}
      />

      <ProducaoLeiteiraInput
        litrosDiaPropriedade={form.litrosDiaPropriedade}
        setLitrosDiaPropriedade={(value) =>
          handleFormChange({ litrosDiaPropriedade: value })
        }
        litrosVacaDia={form.litrosVacaDia}
        setLitrosVacaDia={(value) => handleFormChange({ litrosVacaDia: value })}
      />

      <ComposicaoLeiteInput
        percentualGordura={form.percentualGordura}
        setPercentualGordura={(value) =>
          handleFormChange({ percentualGordura: value })
        }
        percentualProteina={form.percentualProteina}
        setPercentualProteina={(value) =>
          handleFormChange({ percentualProteina: value })
        }
      />

      <ConsumoDiarioInput
        volumoso={form.volumoso}
        setVolumoso={(value) => handleFormChange({ volumoso: value })}
        concentrado={form.concentrado}
        setConcentrado={(value) => handleFormChange({ concentrado: value })}
        unidadeInformada={form.unidadeInformada}
        setUnidadeInformada={(value) =>
          handleFormChange({ unidadeInformada: value })
        }
        renderRadioButton={renderRadioButton}
      />

      <EnergiaEletricaInput
        consumoEnergia={form.consumoEnergia}
        setConsumoEnergia={(value) =>
          handleFormChange({ consumoEnergia: value })
        }
        temEnergiaFotovoltaica={form.temEnergiaFotovoltaica}
        setTemEnergiaFotovoltaica={(value) =>
          handleFormChange({ temEnergiaFotovoltaica: value })
        }
        renderRadioButton={renderRadioButton}
      />

      <LegislacaoAmbientalInput
        temLicencaAmbiental={form.temLicencaAmbiental}
        setTemLicencaAmbiental={(value) =>
          handleFormChange({ temLicencaAmbiental: value })
        }
        temOutorgaAgua={form.temOutorgaAgua}
        setTemOutorgaAgua={(value) =>
          handleFormChange({ temOutorgaAgua: value })
        }
        renderRadioButton={renderRadioButton}
      />
    </View>
  );
};
