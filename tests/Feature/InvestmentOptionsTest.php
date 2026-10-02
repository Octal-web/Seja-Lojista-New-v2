<?php

namespace Tests\Feature;

use App\Http\Requests\PostStoreComplete;
use App\Http\Requests\PostStoreRequest;
use App\Services\StoreService;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Validator;
use ReflectionClass;
use Tests\TestCase;

class InvestmentOptionsTest extends TestCase
{
    private const EXPECTED_OPTIONS = [
        2 => 'ENTRE R$ 500.000,00 A R$ 600.000,00',
        3 => 'ENTRE R$ 600.000,00 A R$ 700.000,00',
        4 => 'ENTRE R$ 700.000,00 A R$ 800.000,00',
        5 => 'ENTRE R$ 800.000,00 A R$ 900.000,00',
        6 => 'ENTRE R$ 900.000,00 A R$ 1.000.000,00',
        7 => 'ACIMA DE R$ 1.000.000,00',
    ];

    public function test_form_and_storage_preserve_the_original_investment_codes(): void
    {
        $source = file_get_contents(resource_path('js/Components/Sections/StoreForm.jsx'));
        preg_match('/const investmentOptions = \[(.*?)\];/s', $source, $block);
        preg_match_all('/value: "(\d+)", label: "([^"]+)"/', $block[1], $options, PREG_SET_ORDER);

        $formOptions = [];
        foreach ($options as $option) {
            $formOptions[(int) $option[1]] = strtoupper($option[2]);
        }

        $this->assertSame(self::EXPECTED_OPTIONS, $formOptions);
        $this->assertSame(
            self::EXPECTED_OPTIONS,
            (new ReflectionClass(StoreService::class))->getConstant('CAPITAIS_DISPONIVEIS'),
        );
    }

    public function test_both_requests_accept_all_six_options_and_reject_invalid_values(): void
    {
        $continuation = PostStoreRequest::create('/segunda-etapa/test-token', 'POST');
        $route = new Route('POST', 'segunda-etapa/{token}', fn () => null);
        $route->bind($continuation);
        $continuation->setRouteResolver(fn () => $route);

        foreach ([new PostStoreComplete(), $continuation] as $request) {
            $rules = ['expectativa_investimento' => $request->rules()['expectativa_investimento']];

            foreach (array_keys(self::EXPECTED_OPTIONS) as $code) {
                foreach ([$code, (string) $code] as $value) {
                    $this->assertTrue(Validator::make(['expectativa_investimento' => $value], $rules)->passes());
                }
            }

            foreach ([null, '', 0, 1, 8, -1, 'abc', '2.5', ['2']] as $value) {
                $validator = Validator::make(['expectativa_investimento' => $value], $rules, $request->messages());
                $this->assertTrue($validator->fails());
                $this->assertContains($validator->errors()->first('expectativa_investimento'), [
                    'Por favor, informe o capital disponível.',
                    'Por favor, informe uma faixa de investimento válida.',
                ]);
            }

            $this->assertTrue(Validator::make([], $rules)->fails());
        }
    }
}
