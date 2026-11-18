import { Composition, Folder } from "remotion";

// ===== Danova Digital =====
import "./brands/danova-digital/fonts";
import { StoryBudiWebsite, STORY_BUDI_FRAMES } from "./brands/danova-digital/videos/StoryBudiWebsite";
import { WebsiteVsNoWebsite } from "./brands/danova-digital/videos/WebsiteVsNoWebsite";

// ===== Tivity =====
import { CostComparison } from "./brands/tivity/videos/CostComparison/CostComparison";
import { TOTAL_FRAMES as COST_FRAMES } from "./brands/tivity/videos/CostComparison/timeline";

// ===== Bilaastore =====
// (belum ada video — taruh di ./brands/bilaastore/videos/ lalu daftarkan di folder "Bilaastore" di bawah)

// ===== Contoh bawaan Remotion =====
import { HelloWorld } from "./_starter/HelloWorld";
import { Logo } from "./_starter/HelloWorld/Logo";
import { Title } from "./_starter/HelloWorld/Title";

// Setiap <Composition> muncul di sidebar Remotion Studio, dikelompokkan per brand dengan <Folder>.
// Panduan folder: BRANDS.md

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Danova-Digital">
        <Composition id="StoryBudiWebsite" component={StoryBudiWebsite} durationInFrames={STORY_BUDI_FRAMES} fps={30} width={1080} height={1920} />
        <Composition id="WebsiteVsNoWebsite" component={WebsiteVsNoWebsite} durationInFrames={645} fps={30} width={1080} height={1920} />
      </Folder>

      <Folder name="Tivity">
        <Composition
          id="CostComparison"
          component={CostComparison}
          durationInFrames={COST_FRAMES}
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
      </Folder>

      <Folder name="Starter">
        <Composition
          id="HelloWorld"
          component={HelloWorld}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ titleText: "Welcome to Remotion", titleColor: "#000000" }}
        />
        <Composition id="Logo" component={Logo} durationInFrames={150} fps={30} width={1920} height={1080} defaultProps={{ logoColor1: "#91EAE4", logoColor2: "#86A8E7" }} />
        <Composition id="Title" component={Title} durationInFrames={115} fps={30} width={1920} height={1080} defaultProps={{ titleText: "Welcome to Remotion", titleColor: "#000000" }} />
      </Folder>
    </>
  );
};
