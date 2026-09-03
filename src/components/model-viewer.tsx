"use client";

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import {
  Bounds,
  Center,
  Environment,
  Html,
  OrbitControls,
  useBounds,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Glasses,
  HelpCircle,
  type LucideIcon,
  Maximize2,
  Minimize2,
  MousePointer2,
  Move3D,
  Rotate3D,
  RotateCcw,
  SlidersHorizontal,
  X,
  ZoomIn,
} from "lucide-react";
import type { WebGLRenderer } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ModelViewerProps = {
  modelUrl: string;
  label: string;
};

type LightingMode = "studio" | "neutral" | "contrast";
type StartVrSession = () => Promise<void>;

const lightingOptions: Array<{ value: LightingMode; label: string }> = [
  { value: "studio", label: "Estudio" },
  { value: "neutral", label: "Neutra" },
  { value: "contrast", label: "Contraste" },
];

const controlHelpItems: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Rotate3D,
    title: "Rotar",
    description: "Mirar la pieza desde todos sus lados.",
  },
  {
    icon: ZoomIn,
    title: "Zoom",
    description: "Acercarte a dientes, suturas, texturas o marcas.",
  },
  {
    icon: Move3D,
    title: "Desplazar",
    description: "Mover el encuadre cuando estás muy cerca.",
  },
  {
    icon: RotateCcw,
    title: "Reset",
    description: "Volver al encuadre inicial si te perdiste.",
  },
  {
    icon: Maximize2,
    title: "Pantalla completa",
    description: "Útil para clase, museo o revisión en detalle.",
  },
  {
    icon: SlidersHorizontal,
    title: "Inspector",
    description: "Activa auto-giro y cambia la iluminación.",
  },
];

function canUseWebGL() {
  if (typeof document === "undefined") {
    return true;
  }

  const canvas = document.createElement("canvas");

  return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
}

type ModelErrorBoundaryProps = {
  children: ReactNode;
};

type ModelErrorBoundaryState = {
  hasError: boolean;
};

function LoadingModel() {
  return (
    <Html center>
      <div className="border-primary/30 bg-background/92 text-foreground w-60 rounded-2xl border p-4 text-center text-sm shadow-[0_0_34px_rgba(0,229,255,0.18)] backdrop-blur">
        <Skeleton className="mb-3 h-1.5 w-full" />
        <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
          Cargando modelo 3D
        </p>
        <p className="text-muted-foreground mt-2 text-xs">Preparando escena</p>
      </div>
    </Html>
  );
}

type CameraResetterProps = {
  resetSignal: number;
  controlsRef: RefObject<OrbitControlsImpl | null>;
};

function FossilModel({ modelUrl }: Pick<ModelViewerProps, "modelUrl">) {
  const gltf = useGLTF(modelUrl);

  return (
    <Center top>
      <primitive object={gltf.scene} />
    </Center>
  );
}

function CameraResetter({ resetSignal, controlsRef }: CameraResetterProps) {
  const bounds = useBounds();

  useEffect(() => {
    controlsRef.current?.reset();
    bounds.refresh().fit().clip();
  }, [bounds, controlsRef, resetSignal]);

  return null;
}

type WebXRSessionBridgeProps = {
  startVrSessionRef: { current: StartVrSession | null };
  onSupportChange: (isSupported: boolean) => void;
  onSupportCheckedChange: (isChecked: boolean) => void;
  onSessionActiveChange: (isActive: boolean) => void;
  onError: (message: string) => void;
};

function WebXRSessionBridge({
  startVrSessionRef,
  onSupportChange,
  onSupportCheckedChange,
  onSessionActiveChange,
  onError,
}: WebXRSessionBridgeProps) {
  const gl = useThree((state) => state.gl as WebGLRenderer);

  useEffect(() => {
    let currentSession: XRSession | null = null;
    let isMounted = true;

    gl.xr.enabled = true;

    async function startVrSession() {
      if (!navigator.xr) {
        onError("Este navegador no expone WebXR.");
        return;
      }

      if (currentSession) {
        return;
      }

      try {
        const session = await navigator.xr.requestSession("immersive-vr", {
          optionalFeatures: ["local-floor", "bounded-floor"],
        });

        currentSession = session;
        onSessionActiveChange(true);
        session.addEventListener("end", () => {
          currentSession = null;
          onSessionActiveChange(false);
        });
        await gl.xr.setSession(session);
      } catch {
        onError(
          "No se pudo iniciar VR. Revisá permisos, HTTPS y compatibilidad del dispositivo.",
        );
        onSessionActiveChange(false);
      }
    }

    startVrSessionRef.current = startVrSession;

    if (!navigator.xr) {
      onSupportChange(false);
      onSupportCheckedChange(true);
    } else {
      navigator.xr
        .isSessionSupported("immersive-vr")
        .then((isSupported) => {
          if (!isMounted) {
            return;
          }

          onSupportChange(isSupported);
          onSupportCheckedChange(true);
        })
        .catch(() => {
          if (!isMounted) {
            return;
          }

          onSupportChange(false);
          onSupportCheckedChange(true);
        });
    }

    return () => {
      isMounted = false;
      startVrSessionRef.current = null;

      if (currentSession) {
        void currentSession.end();
      }
    };
  }, [
    gl,
    onError,
    onSessionActiveChange,
    onSupportChange,
    onSupportCheckedChange,
    startVrSessionRef,
  ]);

  return null;
}

class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  state: ModelErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="border-destructive/40 bg-background/95 max-w-xs rounded-2xl border p-4 text-center text-sm shadow-lg backdrop-blur">
            <p className="text-destructive font-semibold">
              No se pudo cargar el modelo.
            </p>
            <p className="text-muted-foreground mt-2">
              Verificá que la URL del archivo .glb o .gltf sea pública y válida.
            </p>
          </div>
        </Html>
      );
    }

    return this.props.children;
  }
}

export function ModelViewer({ modelUrl, label }: ModelViewerProps) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const startVrSessionRef = useRef<StartVrSession | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isVrSupported, setIsVrSupported] = useState(false);
  const [isVrSupportChecked, setIsVrSupportChecked] = useState(false);
  const [isVrSessionActive, setIsVrSessionActive] = useState(false);
  const [showVrInfo, setShowVrInfo] = useState(false);
  const [vrError, setVrError] = useState("");
  const [lightingMode, setLightingMode] = useState<LightingMode>("studio");
  const [supportsWebGL] = useState(canUseWebGL);
  const hasModelUrl = modelUrl.trim().length > 0;
  const vrStatusLabel = isVrSessionActive
    ? "VR activo"
    : !hasModelUrl
      ? "VR pendiente"
      : !supportsWebGL
        ? "WebGL no disponible"
        : !isVrSupportChecked
          ? "Detectando VR"
          : isVrSupported
            ? "VR disponible"
            : "VR no disponible";
  const vrStatusDescription = isVrSessionActive
    ? "La sesión WebXR está activa. Usá los controles del visor para salir de VR."
    : !hasModelUrl
      ? "La ficha necesita un archivo 3D publicado antes de iniciar una sesión VR."
      : !supportsWebGL
        ? "El navegador no pudo iniciar WebGL, requisito previo para renderizar la escena."
        : !isVrSupportChecked
          ? "Estamos consultando si el navegador soporta sesiones WebXR immersive-vr."
          : isVrSupported
            ? "El navegador detectó soporte WebXR immersive-vr. Podés iniciar la sesión con un visor compatible."
            : "Chrome puede abrir la web, pero VR real requiere visor compatible, runtime XR activo y soporte WebXR immersive-vr en HTTPS o localhost.";

  useEffect(() => {
    function updateFullscreenState() {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    }

    function closePanelsOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowHelp(false);
        setShowInspector(false);
        setShowVrInfo(false);
      }
    }

    document.addEventListener("fullscreenchange", updateFullscreenState);
    document.addEventListener("keydown", closePanelsOnEscape);

    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreenState);
      document.removeEventListener("keydown", closePanelsOnEscape);
    };
  }, []);

  async function toggleFullscreen() {
    if (!viewerRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await viewerRef.current.requestFullscreen();
  }

  return (
    <section
      ref={viewerRef}
      aria-label={label}
      className="paleo-corners fullscreen:h-dvh fullscreen:min-h-dvh fullscreen:max-h-none fullscreen:rounded-none relative h-[clamp(330px,60dvh,580px)] overflow-hidden rounded-3xl border border-(--paleo-border) bg-[radial-gradient(circle_at_50%_35%,rgba(0,126,150,0.13),transparent_18rem),linear-gradient(180deg,#f4fbff,#e7f4fa)] shadow-[0_30px_90px_rgba(15,48,70,0.14)] sm:h-[clamp(400px,62dvh,620px)] lg:h-[clamp(460px,62dvh,660px)] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(0,229,255,0.14),transparent_18rem),linear-gradient(180deg,#07111f,#050b12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
    >
      <div className="pointer-events-none absolute inset-0 z-10 border border-white/5" />
      <div className="border-primary/35 bg-background/70 text-primary pointer-events-none absolute top-4 left-4 z-20 rounded-full border px-3 py-1 font-mono text-[0.62rem] font-bold tracking-[0.18em] uppercase backdrop-blur">
        Modelo 3D
      </div>
      {hasModelUrl && supportsWebGL ? (
        <Canvas
          camera={{ position: [3, 2, 5], fov: 45 }}
          gl={{ antialias: true }}
          className="bg-[radial-gradient(circle_at_center,rgba(0,126,150,0.11),transparent_38%),linear-gradient(180deg,#f4fbff,#e7f4fa)] dark:bg-[radial-gradient(circle_at_center,rgba(89,243,255,0.12),transparent_38%),linear-gradient(180deg,#0b1726,#050b12)]"
        >
          <WebXRSessionBridge
            startVrSessionRef={startVrSessionRef}
            onSupportChange={setIsVrSupported}
            onSupportCheckedChange={setIsVrSupportChecked}
            onSessionActiveChange={setIsVrSessionActive}
            onError={setVrError}
          />
          <ambientLight intensity={lightingMode === "contrast" ? 0.7 : 1.15} />
          <hemisphereLight
            args={[
              lightingMode === "neutral" ? "#ffffff" : "#f2feff",
              "#102235",
              lightingMode === "contrast" ? 1.1 : 1.55,
            ]}
          />
          <directionalLight
            position={[4, 6, 5]}
            intensity={lightingMode === "contrast" ? 3 : 2.4}
          />
          <directionalLight
            position={[-4, 3, -3]}
            intensity={lightingMode === "contrast" ? 0.55 : 1.05}
          />
          <pointLight
            position={[0, 3, 4]}
            intensity={lightingMode === "neutral" ? 0.35 : 0.9}
            color="#59f3ff"
          />
          <ModelErrorBoundary>
            <Suspense fallback={<LoadingModel />}>
              <Bounds fit clip observe margin={1.25}>
                <FossilModel modelUrl={modelUrl} />
                <CameraResetter
                  resetSignal={resetSignal}
                  controlsRef={controlsRef}
                />
              </Bounds>
              {lightingMode === "studio" ? (
                <Environment preset="studio" />
              ) : null}
            </Suspense>
          </ModelErrorBoundary>
          <OrbitControls
            ref={controlsRef}
            enableDamping
            makeDefault
            minDistance={1.5}
            maxDistance={12}
            panSpeed={0.8}
            zoomSpeed={0.8}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_center,rgba(0,126,150,0.11),transparent_38%),linear-gradient(180deg,#f4fbff,#e7f4fa)] px-6 text-center dark:bg-[radial-gradient(circle_at_center,rgba(89,243,255,0.12),transparent_38%),linear-gradient(180deg,#0b1726,#050b12)]">
          <div className="bg-background/90 max-w-sm rounded-2xl border border-(--paleo-border) p-5 shadow-[0_0_34px_rgba(0,229,255,0.14)] backdrop-blur">
            <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
              {hasModelUrl ? "WebGL no disponible" : "Modelo pendiente"}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {hasModelUrl
                ? "El navegador o dispositivo no permite iniciar el contexto WebGL necesario para el visor 3D."
                : "Esta ficha ya está disponible, pero todavía no tiene un archivo 3D publicado para explorar."}
            </p>
          </div>
        </div>
      )}
      <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-2 pl-28">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setResetSignal((currentSignal) => currentSignal + 1)}
          aria-label="Restablecer cámara"
          disabled={!hasModelUrl}
          className="bg-background/78 hover:text-primary text-foreground border-(--paleo-border) backdrop-blur"
        >
          <RotateCcw aria-hidden="true" />
          Reset
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={toggleFullscreen}
          aria-label={
            isFullscreen
              ? "Salir de pantalla completa"
              : "Ver en pantalla completa"
          }
          disabled={!hasModelUrl}
          className="bg-background/78 hover:text-primary text-foreground border-(--paleo-border) backdrop-blur"
        >
          {isFullscreen ? (
            <Minimize2 aria-hidden="true" />
          ) : (
            <Maximize2 aria-hidden="true" />
          )}
          {isFullscreen ? "Salir" : "Pantalla completa"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            setShowHelp((currentValue) => !currentValue);
            setShowInspector(false);
            setShowVrInfo(false);
          }}
          aria-expanded={showHelp}
          aria-controls="model-viewer-help"
          className="bg-background/78 hover:text-primary text-foreground border-(--paleo-border) backdrop-blur"
        >
          <HelpCircle aria-hidden="true" />
          Ayuda
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            setShowInspector((currentValue) => !currentValue);
            setShowHelp(false);
            setShowVrInfo(false);
          }}
          aria-expanded={showInspector}
          aria-controls="model-viewer-inspector"
          className="bg-background/78 hover:text-primary text-foreground border-(--paleo-border) backdrop-blur"
        >
          <SlidersHorizontal aria-hidden="true" />
          Inspector
        </Button>
      </div>
      {showHelp ? (
        <div
          id="model-viewer-help"
          className="bg-background/95 text-muted-foreground absolute inset-x-4 top-16 bottom-4 z-30 max-w-lg overflow-y-auto rounded-2xl border border-(--paleo-border) p-4 text-sm leading-6 shadow-[0_0_34px_rgba(0,229,255,0.12)] backdrop-blur sm:top-auto sm:right-4 sm:bottom-16 sm:left-auto sm:max-h-[calc(100%-6rem)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                Cómo explorar el modelo
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Probá primero rotar, después acercar y finalmente desplazar la
                vista si querés inspeccionar un detalle lateral.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="hover:bg-primary/10 hover:text-primary focus-visible:ring-ring text-muted-foreground inline-flex size-8 shrink-0 items-center justify-center rounded-full transition focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Cerrar ayuda del visualizador"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="bg-secondary/35 rounded-xl border border-(--paleo-border) p-3">
              <p className="text-foreground flex items-center gap-2 font-semibold">
                <MousePointer2
                  aria-hidden="true"
                  className="text-primary size-4"
                />
                Mouse
              </p>
              <ul className="mt-1 space-y-1">
                <li>Arrastrá con botón izquierdo para rotar.</li>
                <li>Usá la rueda para acercar o alejar.</li>
                <li>
                  Botón derecho o{" "}
                  <kbd className="rounded border border-(--paleo-border) px-1 font-mono text-[0.68rem]">
                    Ctrl
                  </kbd>{" "}
                  + arrastrar para desplazar.
                </li>
              </ul>
            </div>
            <div className="bg-secondary/35 rounded-xl border border-(--paleo-border) p-3">
              <p className="text-foreground flex items-center gap-2 font-semibold">
                <Move3D aria-hidden="true" className="text-primary size-4" />
                Pantalla táctil
              </p>
              <ul className="mt-1 space-y-1">
                <li>Un dedo rota el objeto.</li>
                <li>Pinza con dos dedos controla el zoom.</li>
                <li>Dos dedos arrastrando desplazan la vista.</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            {controlHelpItems.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-background/55 flex items-center gap-3 rounded-xl border border-(--paleo-border) p-3"
              >
                <Icon
                  aria-hidden="true"
                  className="text-primary size-4 shrink-0"
                />
                <div>
                  <p className="text-foreground font-medium">{title}</p>
                  <p className="text-muted-foreground text-xs">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="bg-background/78 text-muted-foreground pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-(--paleo-border) px-3 py-1 font-mono text-[0.62rem] tracking-[0.14em] uppercase shadow-sm backdrop-blur">
        Arrastrar para rotar · Scroll para zoom
      </div>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => {
          setVrError("");
          setShowHelp(false);
          setShowInspector(false);

          if (isVrSupported && !isVrSessionActive) {
            void startVrSessionRef.current?.();
            return;
          }

          setShowVrInfo((currentValue) => !currentValue);
        }}
        aria-pressed={isVrSessionActive}
        aria-expanded={showVrInfo}
        aria-controls="model-viewer-vr-info"
        aria-label={`${vrStatusLabel}: ${vrStatusDescription}`}
        title={`${vrStatusLabel}: ${vrStatusDescription}`}
        className="bg-background/82 hover:text-primary text-foreground absolute right-4 bottom-4 z-20 border-(--paleo-border) shadow-sm backdrop-blur"
      >
        <Glasses aria-hidden="true" />
        {isVrSessionActive ? "VR activo" : "VR"}
      </Button>
      {showVrInfo ? (
        <div
          id="model-viewer-vr-info"
          className="bg-background/95 absolute right-4 bottom-16 z-30 w-[min(22rem,calc(100%-2rem))] rounded-2xl border border-(--paleo-border) p-4 text-sm shadow-[0_0_34px_rgba(0,229,255,0.12)] backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-foreground flex items-center gap-2 font-semibold">
                <Glasses aria-hidden="true" className="text-primary size-4" />
                {vrStatusLabel}
              </p>
              <p className="text-muted-foreground mt-2 text-xs leading-5">
                {vrStatusDescription}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowVrInfo(false)}
              className="hover:bg-primary/10 hover:text-primary focus-visible:ring-ring text-muted-foreground inline-flex size-8 shrink-0 items-center justify-center rounded-full transition focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Cerrar información de VR"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
      {showInspector ? (
        <div
          id="model-viewer-inspector"
          className="bg-background/92 absolute right-4 bottom-16 z-20 w-[min(22rem,calc(100%-2rem))] rounded-2xl border border-(--paleo-border) p-4 shadow-[0_0_34px_rgba(0,229,255,0.12)] backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                Model inspector
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Ajustes rápidos para examinar la pieza.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowInspector(false)}
              className="hover:bg-primary/10 hover:text-primary focus-visible:ring-ring text-muted-foreground inline-flex size-8 shrink-0 items-center justify-center rounded-full transition focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Cerrar inspector del modelo"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => setAutoRotate((currentValue) => !currentValue)}
              disabled={!hasModelUrl || !supportsWebGL}
              aria-pressed={autoRotate}
              className="bg-background/70 text-foreground border-(--paleo-border)"
            >
              <Rotate3D aria-hidden="true" />
              {autoRotate ? "Pausar auto-giro" : "Activar auto-giro"}
            </Button>
            <label className="text-muted-foreground grid gap-2 font-mono text-[0.62rem] font-semibold tracking-[0.14em] uppercase">
              Iluminación
              <select
                value={lightingMode}
                onChange={(event) =>
                  setLightingMode(event.target.value as LightingMode)
                }
                disabled={!hasModelUrl || !supportsWebGL}
                className="focus:border-primary/75 focus:ring-primary/20 bg-background/70 text-foreground h-10 rounded-xl border border-(--paleo-border) px-3 text-sm outline-none focus:ring-2"
              >
                {lightingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-muted-foreground text-xs leading-5">
              Estudio conserva reflejos del entorno. Neutra reduce acentos.
              Contraste resalta relieve y bordes.
            </p>
            <div className="bg-background/55 rounded-xl border border-(--paleo-border) p-3">
              <p className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <Glasses aria-hidden="true" className="text-primary size-4" />
                {vrStatusLabel}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {vrStatusDescription}
              </p>
            </div>
            {vrError ? (
              <p className="text-destructive text-xs leading-5" role="status">
                {vrError}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
