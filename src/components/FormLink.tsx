import React, { useEffect, useState } from "react";
import { sesionService } from "../api/sesionService";

interface FormLinkProps {
  onSubmit: (data: FormData) => void;
  onSuccess?: () => void;
}

export interface FormData {
  id_horario: number;
  id_lab: number;
  observaciones: string;
}

interface Materia {
  id_asignatura: number;
  nombre_asignatura: string;
  semestre: number;
}

interface Horario {
  id_horario: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  aula: string;
  grupo: string;
}

interface Laboratorio {
  id_lab: number;
  codigo_lab: string;
  nombre_lab: string;
  capacidad: number;
  piso: number;
  ubicacion: string;
}

const FormLink = ({ onSubmit }: FormLinkProps) => {
  const [formData, setFormData] = useState({
    id_asignatura: "",
    id_horario: "",
    id_lab: "",
    observaciones: "",
  });

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);

  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<Horario | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [materiasRes, laboratorioRes] = await Promise.all([
        sesionService.getMaterias(),
        sesionService.getLaboratorios(),
      ]);

      setMaterias(materiasRes.materias);
      setLaboratorios(laboratorioRes.laboratorios);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMateriaChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value;
    setFormData({ ...formData, id_asignatura: id, id_horario: "" });
    setSelectedHorario(null);

    if (id) {
      const materia = materias.find((m) => m.id_asignatura === parseInt(id));
      setSelectedMateria(materia || null);

      try {
        setLoadingHorarios(true);
        const data = await sesionService.getHorarios(parseInt(id));
        setHorarios(data.horarios);
      } catch (err: any) {
        console.error(err);
        alert(err.response?.data?.message || "Error al cargar los horarios");
        setHorarios([]);
      } finally {
        setLoadingHorarios(false);
      }
    } else {
      setSelectedMateria(null);
      setHorarios([]);
    }
  };

  const handleHorarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setFormData({ ...formData, id_horario: id });

    if (id) {
      const horario = horarios.find((h) => h.id_horario === parseInt(id));
      setSelectedHorario(horario || null);
    } else {
      setSelectedHorario(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id_horario || !formData.id_lab) {
      alert("Por favor completa todos los campos ");
      return;
    }
    onSubmit({
      id_horario: parseInt(formData.id_horario),
      id_lab: parseInt(formData.id_lab),
      observaciones: formData.observaciones,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-[#767676] font-semibold">Cargando datos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={loadInitialData}
          className="mt-2 text-sm text-red-600 underline hover:text-red-800"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const isFormValid =
    formData.id_asignatura && formData.id_horario && formData.id_lab;
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-[#767676] uppercase tracking-wide mb-2">
          Materia <span className="text-red-600">*</span>
        </label>
        <select
          value={formData.id_asignatura}
          onChange={handleMateriaChange}
          required
          className="w-full px-4 py-3 bg-white border-2 border-[#767676] rounded-lg font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all"
        >
          <option value="">Selecciona una materia</option>
          {materias.map((materia) => (
            <option key={materia.id_asignatura} value={materia.id_asignatura}>
              {materia.nombre_asignatura}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#767676] uppercase tracking-wide mb-2">
          Horario y Grupo <span className="text-red-600">*</span>
        </label>
        <select
          value={formData.id_horario}
          onChange={handleHorarioChange}
          disabled={!formData.id_asignatura || loadingHorarios}
          required
          className="w-full px-4 py-3 bg-white border-2 border-[#767676] rounded-lg text-[#767676] font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">
            {loadingHorarios ? "Horarios cargando" : "Selecciona un horario"}
          </option>
          {horarios.map((horario) => (
            <option key={horario.id_horario} value={horario.id_horario}>
              {horario.dia.charAt(0).toUpperCase() + horario.dia.slice(1)} |{" "}
              {horario.hora_inicio.substring(0, 5)} -{" "}
              {horario.hora_fin.substring(0, 5)} | Grupo {horario.grupo} |{" "}
              {horario.aula}
            </option>
          ))}
        </select>
        {!formData.id_asignatura && (
          <p className="text-xs text-gray-500 mt-1">
            Primero selecciona una materia
          </p>
        )}
      </div>

      {selectedHorario && selectedMateria && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-3">
            📋 Información de la Sesión:
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              <strong>Materia:</strong> {selectedMateria.nombre_asignatura}
            </li>
            <li>
              <strong>Día:</strong>{" "}
              {selectedHorario.dia.charAt(0).toUpperCase() +
                selectedHorario.dia.slice(1)}
            </li>
            <li>
              <strong>Horario:</strong>{" "}
              {selectedHorario.hora_inicio.substring(0, 5)} -{" "}
              {selectedHorario.hora_fin.substring(0, 5)}
            </li>
            <li>
              <strong>Grupo:</strong> {selectedHorario.grupo}
            </li>
            <li>
              <strong>Aula:</strong> {selectedHorario.aula}
            </li>
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-[#767676] uppercase tracking-wide mb-2">
          Laboratorio <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.id_lab}
          onChange={(e) => setFormData({ ...formData, id_lab: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white border-2 border-[#767676] rounded-lg text-[#767676] font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all"
        >
          <option value="">Selecciona un laboratorio</option>
          {laboratorios.map((lab) => (
            <option key={lab.id_lab} value={lab.id_lab}>
              {lab.codigo_lab} - Piso {lab.piso} (Cap: {lab.capacidad})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#767676] uppercase tracking-wide mb-2">
          Observaciones (opcional)
        </label>
        <textarea
          value={formData.observaciones}
          onChange={(e) =>
            setFormData({ ...formData, observaciones: e.target.value })
          }
          rows={3}
          placeholder="Ejemplo: Hoy haremos prácticas de SQL..."
          className="w-full px-4 py-3 bg-white border-2 border-[#767676] rounded-lg text-[#767676] font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full px-6 py-3 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          Generar Enlace
        </button>
      </div>
    </form>
  );
};

export default FormLink;
