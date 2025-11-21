#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#define BUTTON_PIN 0

void task_print(void *pvParameter);
void task_button(void *pvParameter);

void app_main(void)
{
    gpio_config_t io_conf = {
        .pin_bit_mask = 1ULL << BUTTON_PIN,
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_DISABLE
    };
    gpio_config(&io_conf);

    xTaskCreate(task_print, "task_print", 2048, NULL, 5, NULL);
    xTaskCreate(task_button, "task_button", 2048, NULL, 5, NULL);
}

void task_print(void *pvParameter)
{
    while (1) {
        printf("Group Taxis\n");
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}

void task_button(void *pvParameter)
{
    int last_state = 1;

    while (1) {
        int current_state = gpio_get_level(BUTTON_PIN);
        if (current_state == 0 && last_state == 1) {
            printf("ESP32\n");
            vTaskDelay(pdMS_TO_TICKS(200));
        }
        last_state = current_state;
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}