import React, { createContext, useState, useMemo, useContext } from "react";

interface GeneralProps {
  children: React.ReactNode;
}

interface GeneralContextProps {
  isNavBarOpen: boolean;
  selectedLabelId: string;
  handleSelectedLabelId: (val: string) => void;
  toggleNavBar: () => void;
}

const GeneralContext = createContext<GeneralContextProps>({
  isNavBarOpen: true,
  selectedLabelId: "",
  handleSelectedLabelId: (val: string) => {},
  toggleNavBar: () => {}
});

export const GeneralUIProvider: React.FC<GeneralProps> = (
  props: GeneralProps
) => {
  const [isNavBarOpen, setNavBarOpen] = useState<boolean>(true);
  const [selectedLabelId, setSelectedLabelId] = useState<string>("");
  const generalValue = useMemo(() => {
    const toggleNavBar = () => {
      setNavBarOpen(!isNavBarOpen);
    };

    const handleSelectedLabelId = (val: string) => {
      setSelectedLabelId(val);
    };

    return {
      isNavBarOpen,
      selectedLabelId,
      toggleNavBar,
      handleSelectedLabelId
    };
  }, [isNavBarOpen, selectedLabelId]);

  return (
    <GeneralContext.Provider value={generalValue}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export const useGeneralStore = () =>
  useContext<GeneralContextProps>(GeneralContext);
