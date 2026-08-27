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
      <div className="w-52 rounded-xl border bg-white/95 p-4 text-center text-sm shadow-lg">
        <Skeleton className="mb-3 h-2 w-full" />
        <p className="font-medium text-stone-800">Cargando modelo 3D</p>
        <p className="text-muted-foreground mt-1 text-xs">
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
          <div className="max-w-xs rounded-xl border border-red-200 bg-white p-4 text-center text-sm shadow-lg">
            <p className="font-semibold text-red-700">
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
      className="fullscreen:h-dvh fullscreen:min-h-dvh fullscreen:max-h-none fullscreen:rounded-none relative h-[clamp(330px,60dvh,580px)] overflow-hidden rounded-2xl border bg-stone-100 shadow-sm sm:h-[clamp(400px,62dvh,620px)] lg:h-[clamp(460px,62dvh,660px)] dark:border-stone-800 dark:bg-stone-900"
    >
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{ antialias: true }}
        className="bg-gradient-to-b from-stone-50 to-stone-200 dark:from-stone-900 dark:to-stone-800"
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
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setResetSignal((currentSignal) => currentSignal + 1)}
          aria-label="Restablecer cámara"
          className="bg-white/90 shadow-sm dark:bg-stone-950/90"
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
          className="bg-white/90 shadow-sm dark:bg-stone-950/90"
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
          className="bg-white/90 shadow-sm dark:bg-stone-950/90"
        >
          <HelpCircle aria-hidden="true" />
          Ayuda
        </Button>
      </div>
      {showHelp ? (
        <div
          id="model-viewer-help"
          className="absolute right-4 bottom-14 left-4 max-w-md rounded-xl border bg-white/95 p-4 text-sm leading-6 text-stone-700 shadow-lg sm:left-auto dark:border-stone-800 dark:bg-stone-950/95 dark:text-stone-300"
        >
          <p className="font-semibold text-stone-900 dark:text-stone-50">
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
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs text-stone-600 shadow-sm dark:bg-stone-950/90 dark:text-stone-300">
        Rotar, desplazar y hacer zoom con mouse o gestos táctiles
      </div>
    </section>
  );
}
