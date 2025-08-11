import { type ChartConfig } from "@/components/ui/chart"

// Imagination
const imaginationData = [
  { type_name: "Hybirdization", num: 11977, fill: "#ff177f" },
  { type_name: "Multi-Object", num: 8881, fill: "#ff95b5" },
  { type_name: "Spatio Temporal", num: 8401, fill: "#ffbdd4" },
  { type_name: "Attribute Shift", num: 8282, fill: "#ffe4ef" }
]

const imaginationConfig = {
  type_name: {
    label: "Type",
  },
  Hybirdization: {
    label: "Hybirdization",
    color: "#ff177f",
  },
  AttributeShift: {
    label: "Attribute Shift",
    color: "#ffe4ef",
  },
  MultiObject: {
    label: "Multi-Object",
    color: "#ff95b5",
  },
  Spatiotemporal: {
    label: "Spatiotemporal",
    color: "#ffbdd4",
  }
} satisfies ChartConfig

// Multi-Reference
const multiReferenceData = [
    { type_name: "Object-Object", num: 24001, fill: "#32388f" },
    { type_name: "Any Two Entities", num: 19174, fill: "#0463b7" },
    { type_name: "Human-Object-Scene", num: 13566, fill: "#57abe7" },
    { type_name: "Human-Human", num: 11084, fill: "#d2f1ff" },
    { type_name: "Others", num: 4904, fill: "#fbfeff" },
  ]
  
  const multiReferenceConfig = {
    type_name: {
      label: "Type",
    },
    ObjectObject: {
      label: "Object-Object",
      color: "#32388f",
    },
    AnyTwoEntities: {
      label: "Any Two Entities",
      color: "#0463b7",
    },
    HumanObjectScene: {
      label: "Human-Object-Scene",
      color: "#57abe7",
    },
    HumanHuman: {
      label: "Human-Human",
      color: "#d2f1ff",
    },
    Others: {
      label: "Others",
      color: "#fbfeff",
    },
  } satisfies ChartConfig

// Instruction Following
const instructionFollowingData = [
    { type_name: "Hard", num: 32805, fill: "#9667e0" },
    { type_name: "Medium", num: 21016, fill: "#d4bbfc" },
    { type_name: "Easy", num: 14137, fill: "#ebd9fc" }
  ]
  
  const instructionFollowingConfig = {
    type_name: {
      label: "Type",
    },
    Easy: {
      label: "Easy",
      color: "#ebd9fc",
    },
    Medium: {
      label: "Medium",
      color: "#d4bbfc",
    },
    Hard: {
      label: "Hard",
      color: "#9667e0",
    }
  } satisfies ChartConfig

export { imaginationData, imaginationConfig, multiReferenceData, multiReferenceConfig, instructionFollowingData, instructionFollowingConfig}