import { h, render, Component } from 'preact'
import { Stage, Container } from 'preact-pixi'
import resource from './Debug'
global.resource = resource
import ActionPhrase from './ActionPhrase'
import BasicSprite from './basics/BasicSprite'
import BasicContainer from './basics/BasicContainer'
import BasicContainerPivot from './basics/BasicContainerPivot'
import BasicSpriteSheet from './basics/BasicSpriteSheet'
import BasicClick from './basics/BasicClick'
import BasicTilingSprite from './basics/BasicTilingSprite'
import BasicText from './basics/BasicText'
import BasicGraphics from './basics/BasicGraphics'
import BasicVideo from './basics/BasicVideo'
import BasicRenderTexture from './basics/BasicRenderTexture'
import BasicTexturedMesh from './basics/BasicTexturedMesh'
import BasicFilter from './basics/BasicFilter'
import DemoAnimatedSprite from './demos/DemoAnimatedSprite'
import DemoAnimatedSpeed from './demos/DemoAnimatedSpeed'
import DemoInteractivity from './demos/DemoInteractivity'
import DemoDragging from './demos/DemoDragging'
import DemoText from './demos/DemoText'
import DemoRenderTexture from './demos/DemoRenderTexture'
import DemoGraphics from './demos/DemoGraphics'
import DemoMasking from './demos/DemoMasking'
import DemoMaskRT from './demos/DemoMaskRT'
import DemoBlendModes from './demos/DemoBlendModes'
import DemoTinting from './demos/DemoTinting'
import DemoParticleContainer from './demos/DemoParticleContainer'
import DemoCacheAsBitmap from './demos/DemoCacheAsBitmap'
import DemoStrip from './demos/DemoStrip'
import DemoTextureSwap from './demos/DemoTextureSwap'
import DemoTextureRotate from './demos/DemoTextureRotate'
import DemoAlphaMask from './demos/DemoAlphaMask'
import DemoMouseTrail from './demos/DemoMouseTrail'
import DemoCustomCursor from './demos/DemoCustomCursor'
import DemoSlots from './demos/DemoSlots'
import DemoStarWarp from './demos/DemoStarWarp'
import FilterBasic from './demos/FilterBasic'
import FilterMouse from './demos/FilterMouse'
import FilterBlur from './demos/FilterBlur'
import FilterOutline from './demos/FilterOutline'
import FilterDisplacementMap from './demos/FilterDisplacementMap'
import OverlayBlendMode from './demos/OverlayBlendMode'

class App extends Component
{
    render()
    {
        return (
            <Stage
                options={{
                    width: 800,
                    height: 600,
                    transparent: !true,
                    backgroundColor: 0x1099bb
                }}
            >
                <ActionPhrase />
                <Container>
                    {/* <BasicSprite /> */}
                    {/* <BasicContainer /> */}
                    {/* <BasicContainerPivot /> */}
                    {/* <BasicSpriteSheet /> */}
                    {/* <BasicClick /> */}
                    {/* <BasicTilingSprite /> */}
                    {/* <BasicText /> */}
                    {/* <BasicGraphics /> */}
                    {/* <BasicVideo /> */}
                    {/* <BasicRenderTexture /> */}
                    {/* <BasicTexturedMesh /> */}
                    {/* <BasicFilter /> */}
                </Container>
                <Container>
                    {/* <DemoAnimatedSprite /> */}
                    {/* <DemoAnimatedSpeed /> */}
                    {/* <DemoInteractivity /> */}
                    {/* <DemoDragging /> */}
                    {/* <DemoText /> */}
                    {/* <DemoRenderTexture /> */}
                    {/* <DemoGraphics /> */}
                    {/* <DemoMasking /> */}
                    {/* <DemoMaskRT /> */}
                    {/* <DemoBlendModes /> */}
                    {/* <DemoTinting /> */}
                    {/* <DemoParticleContainer /> */}
                    {/* <DemoCacheAsBitmap /> */}
                    {/* <DemoStrip /> */}
                    {/* <DemoTextureSwap /> */}
                    {/* <DemoTextureRotate /> */}
                    {/* <DemoAlphaMask /> */}
                    {/* <DemoMouseTrail /> */}
                    {/* <DemoCustomCursor /> */}
                    {/* <DemoSlots /> */}
                    {/* <DemoStarWarp /> */}
                </Container>
                <Container>
                    {/* <FilterBasic /> */}
                    {/* <FilterMouse /> */}
                    {/* <FilterBlur /> */}
                    {/* <FilterOutline /> */}
                    {/* <FilterDisplacementMap /> */}
                </Container>
                <Container>
                    {/* <OverlayBlendMode /> */}
                </Container>
            </Stage>
        )
    }
}

window.main = _ =>
{
    render(<App />, document.body)
}
