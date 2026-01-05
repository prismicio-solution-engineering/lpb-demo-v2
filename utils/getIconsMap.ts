import Zoom from "@/components/Icons/Zoom";
import Reuse from "@/components/Icons/Reuse";
import Hammer from "@/components/Icons/Hammer";
import Thunder from "@/components/Icons/Thunder";
import Test from "@/components/Icons/Test";
import Brand from "@/components/Icons/Brand";
import CheckedCalendar from "@/components/Icons/CheckedCalendar";
import Smile from "@/components/Icons/Smile";
import Control from "@/components/Icons/Control";

export const iconsMap: Record<string, React.FC<{ className?: string }>> = {
  zoom: Zoom,
  reuse: Reuse,
  hammer: Hammer,
  thunder: Thunder,
  test: Test,
  brand: Brand,
  smile: Smile,
  checkedCalendar: CheckedCalendar,
  control: Control,
};