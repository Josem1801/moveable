import React from "react";
import { Container } from "./common/components/container";
import { WithMoveable } from "./modules/with-moveable";
import { Tab } from "./common/components/tab";
import { useBoolean } from "./common/hooks/use-boolean";
import { CustomMoveableModule } from "./modules/custom-moveable";
const App = () => {
  const { toggle, value } = useBoolean();
  return (
    <Container>
      <section className="py-10">
        <div class="text-sm w-fit mx-auto font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex flex-wrap w-fit">
            <Tab isActive={value} onClick={toggle}>
              Using Moveable
            </Tab>
            <Tab isActive={!value} onClick={toggle}>
              Custom Moveable
            </Tab>
          </ul>
        </div>
      </section>
      <section className="flex flex-col items-center h-4/5">
        {value ? <WithMoveable /> : <CustomMoveableModule />}
      </section>
    </Container>
  );
};

export default App;
