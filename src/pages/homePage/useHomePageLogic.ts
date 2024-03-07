import { useLabels, useStyles } from "../../hooks/contextHooks";

export const useHomePageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    return {
        labels,
        styles
    }
}