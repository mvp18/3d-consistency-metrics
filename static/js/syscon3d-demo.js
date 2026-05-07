const SYSCON3D_SCENARIOS = {
  consistent_bicycle_k09: {
    label: "L0 consistent scene - bicycle, K=9",
    stem: "consistent_bicycle_k09",
    description: "A clean, geometrically consistent Mip-NeRF360 bicycle sample. This is the L0 sanity-check case.",
  },
  epsilon_bicycle_k09: {
    label: "L0 + imperceptible Gaussian noise - bicycle, K=9",
    stem: "epsilon_bicycle_k09",
    description: "The same consistent bicycle sample with small iid Gaussian noise added at every pixel.",
  },
  one_outlier_k09_000: {
    label: "One outlier view, K=9",
    stem: "one_outlier_k09_000",
    description: "Eight views come from one scene and one view is replaced by an unrelated scene.",
  },
  full_mixture_k09_000: {
    label: "Full cross-scene mixture, K=9",
    stem: "full_mixture_k09_000",
    description: "The input set is assembled from different source scenes, so there is no single coherent 3D scene.",
  },
  gaussian_noise_k09_000: {
    label: "Pure Gaussian-noise images, K=9",
    stem: "gaussian_noise_k09_000",
    description: "Every input image is deterministic Gaussian noise. There is no underlying scene geometry.",
  },
  patched_gaussian_k09_000: {
    label: "Patched Gaussian corruption, K=9",
    stem: "patched_gaussian_k09_000",
    description: "Gaussian patches corrupt a multi-view input set while preserving some original image content.",
  },
};

const SYSCON3D_ENGINES = {
  mast3r: "MASt3R",
  dust3r: "DUSt3R",
  fast3r: "Fast3R",
  vggt: "VGGT",
  robust_vggt: "RobustVGGT",
};

function setSyscon3dScenario(scenarioId) {
  const scenario = SYSCON3D_SCENARIOS[scenarioId] || SYSCON3D_SCENARIOS.consistent_bicycle_k09;
  const description = document.getElementById("syscon3d-demo-description");

  if (description) {
    description.textContent = scenario.description;
  }

  Object.entries(SYSCON3D_ENGINES).forEach(([engineId, engineLabel]) => {
    const viewer = document.querySelector(`[data-syscon3d-engine="${engineId}"]`);
    const caption = document.getElementById(`syscon3d-caption-${engineId}`);

    if (viewer) {
      viewer.src = `./static/models/syscon3d_demo/${scenario.stem}_${engineId}.glb`;
      viewer.alt = `${engineLabel} reconstruction for ${scenario.label}.`;
    }
    if (caption) {
      caption.textContent = scenario.label;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("syscon3d-demo-scenario");

  if (select) {
    select.addEventListener("change", () => setSyscon3dScenario(select.value));
    setSyscon3dScenario(select.value);
  }
});
