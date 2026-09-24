import { RiseContext } from "../providers/RiseProvider";
import { useContext, useEffect, useState } from "react";

export function useHistoryPlans() {
  const context = useContext(RiseContext);
  if (!context) {
    throw new Error("useRise debe usarse dentro de RiseProvider");
  }
  const { historyPlans, setHistoryPlans } = context;

  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const toggleExpandPlan = (id: string) => {
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  const handleDeleteHistoryPlan = async (id: string) => {
    try {
      const res = await fetch(`/api/plan/${id}/delete`, {
        method: "DELETE",
      });

      if (res.ok) {
        setHistoryPlans(historyPlans.filter((plan) => plan.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar el plan del historial:", error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/plan/history");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setHistoryPlans(data);
          }
        }
      } catch (error) {
        console.error("Error al obtener el historial de planes:", error);
      }
    };

    fetchHistory();
  }, [setHistoryPlans]);

  return {
    ...context,
    historyPlans,
    setHistoryPlans,
    expandedPlanId,
    toggleExpandPlan,
    handleDeleteHistoryPlan,
  };
}
