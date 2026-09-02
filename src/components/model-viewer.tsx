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
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HelpCircle, Maximize2, Minimize2, RotateCcw } from "lucide-react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ModelViewerProps = {
  modelUrl: string;
  label: string;
};

type ModelErrorBoundaryProps = {
  children: ReactNode;
};

type ModelErrorBoundaryState = {
  hasError: boolean;
};

function LoadingModel() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="border-primary/30 bg-background/92 text-foreground w-60 rounded-2xl border p-4 text-center text-sm shadow-[0_0_34px_rgba(0,229,255,0.18)] backdrop-blur">
        <Skeleton className="mb-3 h-1.5 w-full" />
        <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
          Cargando modelo 3D
        </p>
        <p className="text-muted-foreground mt-2 text-xs">
          {Math.round(progress)}%
        </p>
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
    <Center>
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
  const [resetSignal, setResetSignal] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const hasModelUrl = modelUrl.trim().length > 0;

  useEffect(() => {
    function updateFullscreenState() {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    }

    document.addEventListener("fullscreenchange", updateFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreenState);
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
      className="paleo-corners fullscreen:h-dvh fullscreen:min-h-dvh fullscreen:max-h-none fullscreen:rounded-none relative h-[clamp(330px,60dvh,580px)] overflow-hidden rounded-3xl border border-[var(--paleo-border)] bg-[radial-gradient(circle_at_50%_35%,rgba(0,229,255,0.14),transparent_18rem),linear-gradient(180deg,#07111f,#050b12)] shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:h-[clamp(400px,62dvh,620px)] lg:h-[clamp(460px,62dvh,660px)]"
    >
      <div className="pointer-events-none absolute inset-0 z-10 border border-white/5" />
      <div className="border-primary/35 bg-background/70 text-primary pointer-events-none absolute top-4 left-4 z-20 rounded-full border px-3 py-1 font-mono text-[0.62rem] font-bold tracking-[0.18em] uppercase backdrop-blur">
        Modelo 3D
      </div>
      {hasModelUrl ? (
        <Canvas
          camera={{ position: [3, 2, 5], fov: 45 }}
          gl={{ antialias: true }}
          className="bg-[radial-gradient(circle_at_center,rgba(89,243,255,0.12),transparent_38%),linear-gradient(180deg,#0b1726,#050b12)]"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 6, 4]} intensity={1.8} />
          <ModelErrorBoundary>
            <Suspense fallback={<LoadingModel />}>
              <Bounds fit clip observe margin={1.25}>
                <FossilModel modelUrl={modelUrl} />
                <CameraResetter
                  resetSignal={resetSignal}
                  controlsRef={controlsRef}
                />
              </Bounds>
              <Environment preset="studio" />
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
          />
        </Canvas>
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_center,rgba(89,243,255,0.12),transparent_38%),linear-gradient(180deg,#0b1726,#050b12)] px-6 text-center">
          <div className="bg-background/90 max-w-sm rounded-2xl border border-[var(--paleo-border)] p-5 shadow-[0_0_34px_rgba(0,229,255,0.14)] backdrop-blur">
            <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
              Modelo pendiente
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              Esta ficha ya está disponible, pero todavía no tiene un archivo 3D
              publicado para explorar.
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
          className="bg-background/78 hover:text-primary text-foreground border-[var(--paleo-border)] backdrop-blur"
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
          className="bg-background/78 hover:text-primary text-foreground border-[var(--paleo-border)] backdrop-blur"
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
          onClick={() => setShowHelp((currentValue) => !currentValue)}
          aria-expanded={showHelp}
          aria-controls="model-viewer-help"
          className="bg-background/78 hover:text-primary text-foreground border-[var(--paleo-border)] backdrop-blur"
        >
          <HelpCircle aria-hidden="true" />
          Ayuda
        </Button>
      </div>
      {showHelp ? (
        <div
          id="model-viewer-help"
          className="bg-background/95 text-muted-foreground absolute right-4 bottom-16 left-4 z-20 max-w-md rounded-2xl border border-[var(--paleo-border)] p-4 text-sm leading-6 shadow-[0_0_34px_rgba(0,229,255,0.12)] backdrop-blur sm:left-auto"
        >
          <p className="text-primary font-mono text-xs font-semibold tracking-[0.16em] uppercase">
            Controles del modelo
          </p>
          <ul className="mt-2 space-y-1">
            <li>Rotar: arrastrar con mouse o un dedo.</li>
            <li>Zoom: rueda del mouse o gesto de pinza.</li>
            <li>Desplazar: botón derecho, tecla control o dos dedos.</li>
            <li>Reset: vuelve al encuadre inicial del objeto.</li>
          </ul>
        </div>
      ) : null}
      <div className="bg-background/78 text-muted-foreground pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-[var(--paleo-border)] px-3 py-1 font-mono text-[0.62rem] tracking-[0.14em] uppercase shadow-sm backdrop-blur">
        Arrastrar para rotar · Scroll para zoom
      </div>
    </section>
  );
}
