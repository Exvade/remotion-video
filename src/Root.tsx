import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { CostComparison } from "./CostComparison/CostComparison";

// Danova Digital Content
import "./Danova/fonts";
import { WebsiteVsNoWebsite } from "./Danova/videos/WebsiteVsNoWebsite";
import { StoryBudiWebsite, STORY_BUDI_FRAMES } from "./Danova/videos/StoryBudiWebsite";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
      <Composition
        id="CostComparison"
        component={CostComparison}
        durationInFrames={1170}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          physicalPricePerPcs: 6000,
          physicalQuantity: 300,
          physicalShippingCost: 300000,
          digitalPrice: 99000,
          brandName: "Tivity",
          withAudio: true,
        }}
      />

      {/* ===== Danova Digital Content ===== */}
      <Folder name="Danova-Digital">
        <Composition
          id="StoryBudiWebsite"
          component={StoryBudiWebsite}
          durationInFrames={STORY_BUDI_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="WebsiteVsNoWebsite"
          component={WebsiteVsNoWebsite}
          durationInFrames={645}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
