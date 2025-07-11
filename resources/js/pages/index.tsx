import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
    Theme, 
    Flex,
    Heading,
    Text,
    TextField,
    Button
} from "@radix-ui/themes";

import {
    Form
} from 'radix-ui';



import { PencilIcon } from 'lucide-react';

export default function Index() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title='Home' />


            <Theme grayColor="sand" radius="large" scaling="95%">
                 <Flex direction="column" align={"center"} justify={"center"} height={"100vh"} gapY={"3"}>
                    <Heading as="h1">The quick brown fox jumps over the lazy dog</Heading>

                    <Flex direction={"column"} width={"200px"}>
                        <Text as="label" >teste</Text>
                        <TextField.Root variant="surface" placeholder="Search the docs…" />
                    </Flex>

                    <Flex direction={"column"} width={"200px"}>
                        <Text as="label" >teste</Text>
                        <TextField.Root variant="surface" placeholder="Search the docs…" />
                    </Flex>

                    <Button type='submit' >Cancel</Button>
                    
                </Flex>
            </Theme>

            {/* <Theme grayColor="sand" radius="large" scaling="95%">


                <Flex direction="column" align={"center"} justify={"center"} height={"100vh"}>

                    <h1>Pagina inicial cccdd</h1>
               
                    <Flex direction="column" gap="2" gapY={"5"}>
                        <Text>Hello from Radix Themes :)</Text>
                        <Button>Let's go</Button>
                        <Flex direction={"column"}>
                            <Text as="label" >teste</Text>
                            <TextField.Root variant="surface" placeholder="Search the docs…" />
                        </Flex>

                        <Text as="label" size="2">
                            <Flex gap="2">
                                <Checkbox defaultChecked />
                                Agree to Terms and Conditions
                            </Flex>
                        </Text>

                        <Select.Root defaultValue="apple">
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Fruits</Select.Label>
                                    <Select.Item value="orange">Orange</Select.Item>
                                    <Select.Item value="apple">Apple</Select.Item>
                                    <Select.Item value="grape" disabled>
                                        Grape
                                    </Select.Item>
                                </Select.Group>
                                <Select.Separator />
                                <Select.Group>
                                    <Select.Label>Vegetables</Select.Label>
                                    <Select.Item value="carrot">Carrot</Select.Item>
                                    <Select.Item value="potato">Potato</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>

                    </Flex>




                </Flex>
            </Theme> */}
        </>
    );
}
