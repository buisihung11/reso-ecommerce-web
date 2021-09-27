import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { HStack } from '@chakra-ui/layout';
import { useNumberInput } from '@chakra-ui/number-input';

function ProductQuantityInput() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 1,
      defaultValue: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}

export default ProductQuantityInput;
