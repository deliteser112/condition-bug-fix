<template>
  <div>
    <div v-if="dataReady">
      <main class="wrapper-interior">
        <div class="content-general">
          <div class="max-width" v-if="dataReady">
            <form @submit.prevent="submitData">
              <div id="cancellation" class="card-details">
                <h2 class="preview-title">Política de cancelación</h2>
                <p>
                  Para cada una de las opciones, agrega las penalidades y el
                  plazo que el cliente tendrá, para cancelar la reservación
                  después de haber realizado el pago
                </p>
                <a @click="$modal.show('modal_cancelation')">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 45.958 45.958"
                    xml:space="preserve"
                    class="icon-l fill-primary"
                  >
                    <g>
                      <path
                        d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                      />
                    </g>
                  </svg>
                  <span class="text-add">Agregar cancelación</span>
                </a>
                <modal
                  name="modal_cancelation"
                  width="600px"
                  height="auto"
                  :adaptive="true"
                  :scrollable="true"
                  :shiftX="0.5"
                  :shiftY="0.5"
                >
                  <div class="header-modal">
                    <div class="header-modal-title">
                      Política de cancelación
                    </div>
                    <button
                      type="button"
                      class="cross"
                      @click="$modal.hide('modal_cancelation')"
                      title="Cerrar"
                    >
                      X
                    </button>
                  </div>
                  <div class="overflow-div">
                    <div class="wrap-modal">
                      <div class="modal__cancelation">
                        <select class="form-control">
                          <option
                            v-for="(option, index) in options"
                            :key="index"
                            :value="`cancel_option_${option.id}`"
                          >
                            {{ option.nombre }}
                          </option>
                        </select>
                        <div class="div-content-wrap">
                          <div
                            class="row fwp"
                            v-for="(cancel, index) in cancelaciones"
                            :key="index"
                            :value="`cancel_option_${cancel.opcion}`"
                          >
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form"
                                >Dias antes</label
                              >
                              <input
                                type="number"
                                min="0"
                                class="form-control wd-100"
                                placeholder="ej: 4"
                                v-model="cancel.dias"
                              />
                            </div>
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form">Moneda</label>
                              <select
                                class="form-control"
                                disabled
                                v-model="cancel.moneda"
                              >
                                <option
                                  v-for="(typeMoney, index) in typesMoney"
                                  :key="index"
                                  :value="lower(typeMoney)"
                                >
                                  {{ typeMoney }}
                                </option>
                              </select>
                            </div>
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form">Tipo</label>
                              <select
                                v-model="cancel.tipoDescuento"
                                class="form-control"
                              >
                                <option
                                  v-for="(typeDiscount, index) in typesDiscount"
                                  :key="index"
                                  :value="lower(typeDiscount)"
                                >
                                  {{ typeDiscount }}
                                </option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label class="semi-bold label-form">Valor</label>
                              <input
                                type="number"
                                min="0"
                                class="form-control wd-100"
                                placeholder="ej: 55000"
                                v-model="cancel.valor"
                              />
                              <svg
                                svg
                                v-if="index > 0"
                                height="512pt"
                                viewBox="0 0 512 512"
                                width="512pt"
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon-l fill-danger"
                                @click="deleteCancellation(index)"
                              >
                                <path
                                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                                />
                              </svg>
                            </div>
                          </div>
                          <a @click="addCancellation">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 45.958 45.958"
                              xml:space="preserve"
                              class="icon-l fill-primary"
                            >
                              <g>
                                <path
                                  d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                                />
                              </g>
                            </svg>
                            <span class="text-add">Agregar otra política</span>
                          </a>
                          <div class="checkbox-custom mt-5">
                            <input
                              type="checkbox"
                              id="checkbox_cancelation"
                            /><label for="checkbox_cancelation"
                              >Aply all Options</label
                            >
                          </div>
                          <div class="mt-20">
                            <button
                              @click="$modal.hide('modal_cancelation')"
                              type="button"
                              class="btn btn--blue"
                            >
                              Guardar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>
                <div class="table-div mt-15">
                  <table class="table table-js">
                    <thead class="tablehead-js">
                      <tr>
                        <th>Opciones</th>
                        <th>Dias antes</th>
                        <th>Moneda</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <v-collapse-group :onlyOneActive="true">
                        <tr>
                          <td colspan="5" class="p-0 brd-0">
                            <v-collapse-wrapper
                              v-on:onStatusChange="activeCollapse"
                            >
                              <table>
                                <tr class="tablerow-js">
                                  <td colspan="5" class="text-left">
                                    <div v-collapse-toggle>
                                      <button
                                        type="button"
                                        class="btn__expando-row link-button"
                                      >
                                        <svg
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          width="451.847px"
                                          height="451.847px"
                                          viewBox="0 0 451.847 451.847"
                                          style="
                                            enable-background: new 0 0 451.847
                                              451.847;
                                          "
                                          xml:space="preserve"
                                          focusable="false"
                                          class="icon-xs fill-primary arrow-svg"
                                        >
                                          <g>
                                            <path
                                              d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                                            />
                                          </g>
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="5" class="p-0 brd-0">
                                    <div
                                      class="accordion__content"
                                      v-collapse-content
                                    >
                                      <template>
                                        <tr class="tablerow-js">
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                      </template>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </v-collapse-wrapper>
                          </td>
                        </tr>
                      </v-collapse-group>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="child_occupancy_preview" class="card-details">
                <h2 class="preview-title">Ocupaciones</h2>
                <p>
                  Para cada una de las opciones, puedes cambiar el número máximo
                  de niños y adultos que pueden alojarse
                </p>
                <a @click="$modal.show('modal_occupancy')">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 45.958 45.958"
                    xml:space="preserve"
                    class="icon-l fill-primary"
                  >
                    <g>
                      <path
                        d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                      />
                    </g>
                  </svg>
                  <span class="text-add">Cambiar ocupación</span>
                </a>
                <modal
                  name="modal_occupancy"
                  width="600px"
                  height="auto"
                  :adaptive="true"
                  :scrollable="true"
                  :shiftX="0.5"
                  :shiftY="0.5"
                >
                  <div class="header-modal">
                    <div class="header-modal-title">Política de ocupación</div>
                    <button
                      type="button"
                      class="cross"
                      @click="$modal.hide('modal_occupancy')"
                      title="Cerrar"
                    >
                      X
                    </button>
                  </div>
                  <div class="overflow-div">
                    <div class="wrap-modal">
                      <div class="modal__occupancy">
                        <select class="form-control" v-model="selectedOccup">
                          <option disabled value="">
                            Selecciona una opción
                          </option>
                          <option
                            v-for="(option, index) in options"
                            :key="index"
                            :value="`occupancy_option_${option.id}`"
                          >
                            {{ option.nombre }}
                          </option>
                        </select>
                        <div class="div-content-wrap">
                          <div
                            class="row fwp"
                            v-for="(ocupacion, index) in ocupaciones"
                            :key="index"
                            v-show="
                              shouldDisplayOccup(
                                `occupancy_option_${ocupacion.opcion}`
                              )
                            "
                          >
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form"
                                >Máx adultos</label
                              >
                              <select
                                v-model="ocupacion.maxAdultos"
                                @click="sumOccupation"
                                class="form-control"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                              </select>
                            </div>
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form"
                                >Máx niños</label
                              >
                              <select
                                v-model="ocupacion.maxNinos"
                                @click="sumOccupation"
                                class="form-control"
                              >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label class="semi-bold label-form"
                                >Máx ocupación</label
                              >
                              <select
                                v-model="ocupacion.numeroPersonas"
                                class="form-control"
                                disabled
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="mt-5">
                          <button
                            @click="$modal.hide('modal_occupancy')"
                            type="button"
                            class="btn btn__save btn--blue"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>
                <div class="table-div mt-15">
                  <table class="table">
                    <thead class="stickytable">
                      <tr>
                        <th>Opciones</th>
                        <th>Máx adultos</th>
                        <th>Máx niños</th>
                        <th>Máx ocupación</th>
                      </tr>
                    </thead>
                    <tbody class="stickytable">
                      <tr
                        v-for="(ocupacion, ixOcupPrev) in ocupaciones"
                        :key="ixOcupPrev"
                      >
                        <td>{{ ocupacion.nombre }}</td>
                        <td>{{ ocupacion.maxAdultos }}</td>
                        <td>{{ ocupacion.maxNinos }}</td>
                        <td>{{ ocupacion.numeroPersonas }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="child_rates" class="card-details">
                <h2 class="preview-title">Tarifas niños</h2>
                <p>
                  Para cada una de las opciones, puedes crear tarifas diferentes
                  para los niños
                </p>
                <a @click="$modal.show('modal_child_rates')">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 45.958 45.958"
                    xml:space="preserve"
                    class="icon-l fill-primary"
                  >
                    <g>
                      <path
                        d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                      />
                    </g>
                  </svg>
                  <span class="text-add">Agregar tarifa niño</span>
                </a>
                <modal
                  name="modal_child_rates"
                  width="600px"
                  height="auto"
                  :adaptive="true"
                  :scrollable="true"
                  :shiftX="0.5"
                  :shiftY="0.5"
                >
                  <div class="header-modal">
                    <div class="header-modal-title">Tarifa niños</div>
                    <button
                      type="button"
                      class="cross"
                      @click="$modal.hide('modal_child_rates')"
                      title="Cerrar"
                    >
                      X
                    </button>
                  </div>
                  <div class="overflow-div">
                    <div class="wrap-modal">
                      <div class="modal__child-rates">
                        <select class="form-control">
                          <option
                            v-for="(option, index) in options"
                            :key="index"
                            :value="`child-rates_option_${option.id}`"
                          >
                            {{ option.nombre }}
                          </option>
                        </select>
                        <div class="div-content-wrap">
                          <div
                            class="row fwp"
                            v-for="(tarifa, index) in tarifas"
                            :key="index"
                            :value="`child-rates_option_${tarifa.opcion}`"
                          >
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form"
                                >Edad desde</label
                              >
                              <select
                                class="form-control"
                                v-model="tarifa.edadDesde"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                              </select>
                            </div>
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form"
                                >Edad hasta</label
                              >
                              <select
                                class="form-control"
                                v-model="tarifa.edadHasta"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                              </select>
                            </div>
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form">Moneda</label>
                              <select
                                class="form-control"
                                disabled
                                v-model="tarifa.moneda"
                              >
                                <option
                                  v-for="(typeMoney, index) in typesMoney"
                                  :key="index"
                                  :value="lower(typeMoney)"
                                >
                                  {{ typeMoney }}
                                </option>
                              </select>
                            </div>
                            <div class="form-group mr-20">
                              <label class="semi-bold label-form">Tipo</label>
                              <select
                                class="form-control"
                                v-model="tarifa.tipoDescuento"
                              >
                                <option value="fijo">Fijo</option>
                                <option value="gratis">Gratis</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label class="semi-bold label-form">Valor</label>
                              <input
                                type="number"
                                min="0"
                                class="form-control wd-100"
                                placeholder="Ej: 25000"
                                v-model="tarifa.valor"
                              />
                              <svg
                                v-if="index > 0"
                                height="512pt"
                                viewBox="0 0 512 512"
                                width="512pt"
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon-l fill-danger"
                                @click="deleteRateKids(index)"
                              >
                                <path
                                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <a @click="addRateKids">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 45.958 45.958"
                            xml:space="preserve"
                            class="icon-l fill-primary"
                          >
                            <g>
                              <path
                                d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                              />
                            </g>
                          </svg>
                          <span class="text-add">Agregar otra tarifa</span>
                        </a>
                        <div class="checkbox-custom mt-5">
                          <input
                            type="checkbox"
                            id="checkbox_child_rates"
                          /><label for="checkbox_child_rates"
                            >Aply all options</label
                          >
                        </div>
                        <div class="mt-20">
                          <button
                            @click="$modal.hide('modal_child_rates')"
                            type="button"
                            class="btn btn--blue"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>
                <div class="table-div mt-15">
                  <table class="table table-js">
                    <thead class="tablehead-js">
                      <tr>
                        <th>Opciones</th>
                        <th>Edad desde</th>
                        <th>Edad hasta</th>
                        <th>Moneda</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <v-collapse-group :onlyOneActive="true">
                      <tr>
                        <td colspan="6" class="p-0 brd-0">
                          <v-collapse-wrapper
                            v-on:onStatusChange="activeCollapse"
                          >
                            <table>
                              <tr class="tablerow-js">
                                <td colspan="6" class="text-left">
                                  <div v-collapse-toggle>
                                    <button
                                      type="button"
                                      class="btn__expando-row link-button"
                                    >
                                      <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        width="451.847px"
                                        height="451.847px"
                                        viewBox="0 0 451.847 451.847"
                                        style="
                                          enable-background: new 0 0 451.847
                                            451.847;
                                        "
                                        xml:space="preserve"
                                        focusable="false"
                                        class="icon-xs fill-primary arrow-svg"
                                      >
                                        <g>
                                          <path
                                            d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                                          />
                                        </g>
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="6" class="p-0 brd-0">
                                  <div
                                    class="accordion__content"
                                    v-collapse-content
                                  >
                                    <template>
                                      <tr class="tablerow-js">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </template>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </v-collapse-wrapper>
                        </td>
                      </tr>
                    </v-collapse-group>
                  </table>
                </div>
              </div>

              <div id="check_in_out" v-if="category === 'Alojamientos'">
                <fieldset>
                  <legend>Horarios</legend>
                  <p>
                    Establece el horario en que los clientes pueden llegar a tu
                    establecimiento
                  </p>
                  <div class="check-in-out__wrap fwp">
                    <div class="form-content mr-20">
                      <h3 class="check-in-out__title">Hora de llegada</h3>
                      <div
                        class="fwp"
                        v-for="(llegada, idxLleg) in llegadas"
                        :key="idxLleg"
                      >
                        <div class="form-group mr-20">
                          <label class="bold label-form">Desde</label>
                          <input
                            type="time"
                            class="form-control"
                            v-model="llegada.llegadaDesde"
                          />
                        </div>
                        <div class="form-group">
                          <label class="bold label-form">Hasta</label>
                          <input
                            type="time"
                            class="form-control"
                            v-model="llegada.llegadaHasta"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-content">
                      <h3 class="check-in-out__title">Hora de salida</h3>
                      <div
                        class="fwp"
                        v-for="(salida, idxSal) in salidas"
                        :key="idxSal"
                      >
                        <div class="form-group mr-20">
                          <label class="bold label-form">Desde</label>
                          <input
                            type="time"
                            class="form-control"
                            v-model="salida.salidaDesde"
                          />
                        </div>
                        <div class="form-group">
                          <label class="bold label-form">Hasta</label>
                          <input
                            type="time"
                            class="form-control"
                            v-model="salida.salidaHasta"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div id="chargues_included">
                <fieldset>
                  <legend>Cargos incluidos</legend>
                  <p>Establece los cargos para todas las opciones</p>
                  <div class="div-content-wrap">
                    <div
                      class="row fwp mb-10"
                      :id="`chargues-included_option_${index}`"
                      v-for="(incluido, index) in incluidos"
                      :key="index"
                    >
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Cargo</label>
                        <select
                          name="option"
                          class="form-control"
                          v-model="incluido.cargo"
                        >
                          <option
                            v-for="(typeCharge, index) in typesCharge"
                            :key="index"
                            :value="typeCharge.id"
                          >
                            {{ typeCharge.nombre }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Moneda</label>
                        <select class="form-control" v-model="incluido.moneda">
                          <option
                            v-for="(typeMoney, index) in typesMoney"
                            :key="index"
                            :value="lower(typeMoney)"
                          >
                            {{ typeMoney }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Tipo</label>
                        <select
                          class="form-control"
                          v-model="incluido.tipoDescuento"
                        >
                          <option
                            v-for="(typeDiscount, index) in typesDiscount"
                            :key="index"
                            :value="lower(typeDiscount)"
                          >
                            {{ typeDiscount }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Valor</label>
                        <input
                          type="number"
                          min="0"
                          class="form-control wd-100"
                          placeholder="Ej: 25000"
                          v-model="incluido.valor"
                        />
                      </div>
                      <div class="form-group">
                        <label class="semi-bold label-form">Descripción</label>
                        <select
                          class="form-control"
                          v-model="incluido.descripcion"
                        >
                          <option
                            v-for="(
                              descriptionCharge, index
                            ) in descriptionsCharge"
                            :key="index"
                            :value="descriptionCharge.nombre"
                          >
                            {{ descriptionCharge.nombre }}
                          </option>
                        </select>
                        <svg
                          v-if="index > 0"
                          height="512pt"
                          viewBox="0 0 512 512"
                          width="512pt"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon-l fill-danger"
                          @click="deleteChargeIncluded(index)"
                        >
                          <path
                            d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <a @click="addChargeIncluded">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 45.958 45.958"
                      xml:space="preserve"
                      class="icon-l fill-primary"
                    >
                      <g>
                        <path
                          d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                        />
                      </g>
                    </svg>
                    <span class="text-add">Agregar otra tarifa</span>
                  </a>
                </fieldset>
              </div>

              <div id="chargues_noincluded">
                <fieldset>
                  <legend>Cargos no incluidos</legend>
                  <p>Establece los cargos para todas las opciones</p>
                  <div class="div-content-wrap">
                    <div
                      class="row fwp mb-10"
                      :id="`chargues-no-included_option_${index}`"
                      v-for="(noIncluido, index) in noIncluidos"
                      :key="index"
                    >
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Cargo</label>
                        <select
                          name="option"
                          class="form-control"
                          v-model="noIncluido.cargo"
                        >
                          <option
                            v-for="(typeCharge, index) in typesCharge"
                            :key="index"
                            :value="typeCharge.id"
                          >
                            {{ typeCharge.nombre }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Moneda</label>
                        <select
                          class="form-control"
                          v-model="noIncluido.moneda"
                        >
                          <option
                            v-for="(typeMoney, index) in typesMoney"
                            :key="index"
                            :value="lower(typeMoney)"
                          >
                            {{ typeMoney }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Tipo</label>
                        <select
                          class="form-control"
                          v-model="noIncluido.tipoDescuento"
                        >
                          <option
                            v-for="(typeDiscount, index) in typesDiscount"
                            :key="index"
                            :value="lower(typeDiscount)"
                          >
                            {{ typeDiscount }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group mr-20">
                        <label class="semi-bold label-form">Valor</label>
                        <input
                          type="number"
                          min="0"
                          class="form-control wd-100"
                          placeholder="Ej: 25000"
                          v-model="noIncluido.valor"
                        />
                      </div>
                      <div class="form-group">
                        <label class="semi-bold label-form">Descripción</label>
                        <select
                          class="form-control"
                          v-model="noIncluido.descripcion"
                        >
                          <option
                            v-for="(
                              descriptionCharge, index
                            ) in descriptionsCharge"
                            :key="index"
                            :value="descriptionCharge.nombre"
                          >
                            {{ descriptionCharge.nombre }}
                          </option>
                        </select>
                        <svg
                          v-if="index > 0"
                          height="512pt"
                          viewBox="0 0 512 512"
                          width="512pt"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon-l fill-danger"
                          @click="deleteChargeNoIncluded(index)"
                        >
                          <path
                            d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <a @click="addChargeNoIncluded">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 45.958 45.958"
                      xml:space="preserve"
                      class="icon-l fill-primary"
                    >
                      <g>
                        <path
                          d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                        />
                      </g>
                    </svg>
                    <span class="text-add">Agregar otra tarifa</span>
                  </a>
                </fieldset>
              </div>

              <div id="additional">
                <fieldset>
                  <legend>Condiciones adicionales</legend>
                  <p>
                    Aquí podrás escribir otras condiciones diferentes a las
                    anteriores
                  </p>
                  <div class="add-wrap">
                    <div
                      class="input-add fwp"
                      v-for="(adicional, index) in adicionales"
                      :key="index"
                    >
                      <input
                        type="text"
                        placeholder="ej: Tasa de turismo: $ 115.000. Total por estadía"
                        class="form-control col9"
                        v-model="adicional.descripcion"
                      />
                      <svg
                        v-if="index > 0"
                        height="512pt"
                        viewBox="0 0 512 512"
                        width="512pt"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-l fill-danger"
                        @click="deleteAdditional(index)"
                      >
                        <path
                          d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                        />
                      </svg>
                    </div>
                    <a @click="addAdditional">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 45.958 45.958"
                        xml:space="preserve"
                        class="icon-l fill-primary"
                      >
                        <g>
                          <path
                            d="M22.979,0C10.288,0,0,10.289,0,22.979s10.288,22.979,22.979,22.979c12.69,0,22.979-10.289,22.979-22.979S35.67,0,22.979,0z M32.253,26.977h-5.301v5.289c0,2.207-1.765,3.996-3.972,3.996c-2.206,0-3.971-1.789-3.971-3.996v-5.291H13.71 c-2.207,0-4.006-1.789-4.006-3.997c0-2.207,1.796-3.996,4.003-3.996h5.302v-5.289c0-2.208,1.765-3.997,3.971-3.997 c2.208,0,3.972,1.789,3.972,3.997v5.29h5.301c2.207,0,3.997,1.79,3.997,3.997C36.25,25.188,34.46,26.977,32.253,26.977z"
                          />
                        </g>
                      </svg>
                      <span class="text-add">Agregar otra condición</span>
                    </a>
                  </div>
                </fieldset>
              </div>
              <div class="form__save">
                <button type="submit" class="btn btn--blue mr-10">
                  Guardar
                </button>
                <button
                  @click="previousPage()"
                  type="button"
                  class="btn btn--white"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import service from "@/services/service.js";
//import { numeric } from "vuelidate/lib/validators";
import shared from "@/shared";

export default {
  components: {},
  data() {
    return {
      dataReady: false,
      request: false,
      selectedOccup: "",
      options: {},
      cancelaciones: [{ dias: "", tipoDescuento: "", valor: "" }],
      ocupaciones: [{ maxAdultos: "", maxNinos: "", numeroPersonas: "" }],
      tarifas: [
        {
          edadDesde: "",
          edadHasta: "",
          moneda: "",
          opcion: "",
          tipoDescuento: "",
          valor: "",
        },
      ],
      llegadas: [{ llegadaDesde: "", llegadaHasta: "" }],
      salidas: [{ salidaDesde: "", salidaHasta: "" }],
      incluidos: [
        {
          cargo: "",
          descripcion: "",
          moneda: "",
          opcion: "",
          tipoDescuento: "",
          valor: "",
        },
      ],
      noIncluidos: [
        {
          cargo: "",
          descripcion: "",
          moneda: "",
          opcion: "",
          tipoDescuento: "",
          valor: "",
        },
      ],
      adicionales: [{ descripcion: "" }],
      typesDiscount: [],
      typesCharge: [],
      descriptionsCharge: [
        { id: 1, nombre: "Por persona por la estadia" },
        { id: 2, nombre: "Por persona por día" },
        { id: 3, nombre: "Por habitacion por día" },
        { id: 4, nombre: "Por habitacion por la estadia" },
      ],
      typesMoney: [],
      menuname: "",
      links: {},
    };
  },
  provide() {
    return {
      $v: this.$v,
    };
  },
  validations: {
    /*     noIncluidos: {
      $each: {
        precio: {
          numeric,
        },
      },
    }, */
  },
  async beforeMount() {
    this.request = true;
    const response = await service.get(
      `conditions/services-options?service_id=${this.$route.params.id}`
    );
    this.options = response.data;

    const response2 = await service.get(
      `category?service_id=${this.$route.params.id}`
    );
    this.category = response2.data;
    this.menuname = this.category.nombre;

    const response3 = await service.get("services-options/types-discounts");
    this.typesDiscount = response3.data;

    const response4 = await service.get("conditions/charges");
    this.typesCharge = response4.data;

    const response5 = await service.get("services-options/types-money");
    this.typesMoney = response5.data;

    this.getData();
  },
  updated: function () {
    this.$nextTick(function () {
      shared.adjustTableWidth();
    });
  },
  metaInfo: {
    title: "Condiciones",
    titleTemplate: "%s - Viaja y Descubre",
  },
  methods: {
    async getData() {
      this.linksGeneration(this.$route.params.id, this.menuname);
      const fisrtOptionId = this.options[0].id;

      let ocupaciones = [];
      this.options.forEach((option) => {
        let ocupacionObj = {
          nombre: option.nombre,
          opcion: option.id,
          maxAdultos: option.maxAdultos,
          maxNinos: option.maxNinos,
          numeroPersonas: option.numeroPersonas,
        };
        ocupaciones.push(ocupacionObj);
      });
      this.ocupaciones = ocupaciones;

      let cancelaciones = [];
      let tarifas = [];
      let llegadas = [];
      let salidas = [];
      let incluidos = [];
      let noIncluidos = [];
      let adicionales = [];

      this.options.forEach((option) => {
        option.condiciones.forEach((condition) => {
          if (condition.tipo == "cancelacion") {
            let conditionObj = {
              opcion: condition.opcionServicio,
              cargo: condition.tipo,
              dias: condition.dias,
              tipoDescuento: condition.tipoDescuento,
              valor: condition.valor,
            };
            cancelaciones.push(conditionObj);
          }
          //Tarifa niños
          if (condition.tipo == "tarifa_niños") {
            let conditionObj = {
              id: condition.id,
              opcion: condition.opcionServicio,
              edadDesde: condition.edadDesde,
              edadHasta: condition.edadHasta,
              moneda: condition.moneda,
              tipoDescuento: condition.tipoDescuento,
              valor: condition.valor,
            };
            tarifas.push(conditionObj);
          }
          //Horarios
          if (condition.tipo == "horario") {
            if (
              condition.horariollegada != null &&
              condition.opcionServicio == fisrtOptionId
            ) {
              let conditionObj = {
                llegadaDesde: condition.horariollegada.horaDesde,
                llegadaHasta: condition.horariollegada.horaHasta,
              };
              llegadas.push(conditionObj);
            }
            if (
              condition.horarioSalida != null &&
              condition.opcionServicio == fisrtOptionId
            ) {
              let conditionObj = {
                salidaDesde: condition.horarioSalida.horaDesde,
                salidaHasta: condition.horarioSalida.horaHasta,
              };
              salidas.push(conditionObj);
            }
          }
          //Cargos Incluidos
          if (
            (condition.tipo == "cargo") & (condition.incluido == true) &&
            condition.opcionServicio == fisrtOptionId
          ) {
            let conditionObj = {
              opcion: condition.opcionServicio,
              cargo: condition.tipoCargo.id,
              moneda: condition.moneda,
              tipoDescuento: condition.tipoDescuento,
              valor: condition.valor,
              descripcion: condition.descripcion,
            };
            incluidos.push(conditionObj);
          }
          //Cargos No Incluidos
          if (
            (condition.tipo == "cargo") & (condition.incluido == false) &&
            condition.opcionServicio == fisrtOptionId
          ) {
            let conditionObj = {
              opcion: condition.opcionServicio,
              cargo: condition.tipoCargo.id,
              moneda: condition.moneda,
              tipoDescuento: condition.tipoDescuento,
              valor: condition.valor,
              descripcion: condition.descripcion,
            };
            noIncluidos.push(conditionObj);
          }
          //Adicionales
          if (
            condition.tipo == "adicional" &&
            condition.opcionServicio == fisrtOptionId
          ) {
            let conditionObj = {
              opcion: condition.opcionServicio,
              descripcion: condition.descripcion,
            };
            adicionales.push(conditionObj);
          }
        });
      });

      //I need to load the money of each option when tarifas is empty in Agregar cancelación and Agregar tarifa niño
      const moneyEachOption = this.options.map((option) => {
        return { moneda: option.moneda, opcion: option.id };
      });
      console.log(moneyEachOption);

      //work Ok if I have data in tarifas but if tarifas is empty not work For example:
      //http://localhost:8080/condiciones-detalle/5

      let newCancelaciones = [];
      for (let j = 0; j < this.options.length; j++) {
        for (let i = 0; i < cancelaciones.length; i++) {
          if (this.options[j].id == cancelaciones[i].opcion) {
            let condicionObj = {
              dias: cancelaciones[i].dias,
              tipoDescuento: cancelaciones[i].tipoDescuento,
              valor: cancelaciones[i].valor,
              tipo: "cancelacion",
              opcion: this.options[j].id,
              moneda: this.options[j].moneda,
              nombre: this.options[j].nombre,
            };
            newCancelaciones.push(condicionObj);
          }
        }
      }
      this.cancelaciones = newCancelaciones;

      const cancelGroup = this.cancelaciones.reduce((acc, item) => {
        acc[`option_${item.opcion}`] = acc[`option_${item.opcion}`] || [];
        acc[`option_${item.opcion}`].push(item);
        return acc;
      }, {});
      console.log(cancelGroup);

      let newTarifas = [];
      for (let j = 0; j < this.options.length; j++) {
        for (let i = 0; i < tarifas.length; i++) {
          if (this.options[j].id == tarifas[i].opcion) {
            let condicionObj = {
              edadDesde: tarifas[i].edadDesde,
              edadHasta: tarifas[i].edadHasta,
              tipoDescuento: tarifas[i].tipoDescuento,
              valor: tarifas[i].valor,
              tipo: "tarifa_niños",
              opcion: this.options[j].id,
              moneda: this.options[j].moneda,
              nombre: this.options[j].nombre,
            };
            newTarifas.push(condicionObj);
          }
        }
      }
      this.tarifas = newTarifas;

      const tarifasGroup = this.tarifas.reduce((acc, item) => {
        acc[`option_${item.opcion}`] = acc[`option_${item.opcion}`] || [];
        acc[`option_${item.opcion}`].push(item);
        return acc;
      }, {});
      console.log(tarifasGroup);

      //Is good this. I need to load the div when the array is empty
      if (llegadas.length !== 0) {
        this.llegadas = llegadas;
      }

      if (salidas.length !== 0) {
        this.salidas = salidas;
      }

      if (incluidos.length !== 0) {
        this.incluidos = incluidos;
      }

      if (noIncluidos.length !== 0) {
        this.noIncluidos = noIncluidos;
      }

      if (adicionales.length !== 0) {
        this.adicionales = adicionales;
      }

      this.dataReady = true;
      this.request = false;
    },
    async submitData() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        this.$nextTick(() => {
          window.validateFocusElement();
        });
      } else {
        // let data;
        let body = {};

        body["cancelaciones"] = this.cancelaciones;

        let ocupaciones = [];
        this.ocupaciones.map((ocupacion) => {
          ocupaciones.push({
            maxAdultos: ocupacion.maxAdultos,
            maxNinos: ocupacion.maxNinos,
            maxOcupacion: ocupacion.numeroPersonas,
            opcion: ocupacion.opcion,
            tipo: "ocupacion",
            menores: 0,
          });
        });

        body["ocupaciones"] = ocupaciones;

        body["tarifas"] = this.tarifas;

        let llegadas = [];
        for (let j = 0; j < this.options.length; j++) {
          for (let i = 0; i < this.llegadas.length; i++) {
            let condicionObj = {
              llegadaDesde: this.llegadas[i].llegadaDesde,
              llegadaHasta: this.llegadas[i].llegadaHasta,
              opcion: this.options[j].id,
              tipo: "horario",
            };
            llegadas.push(condicionObj);
          }
        }
        body["llegadas"] = llegadas;

        let salidas = [];
        for (let j = 0; j < this.options.length; j++) {
          for (let i = 0; i < this.salidas.length; i++) {
            let condicionObj = {
              salidaDesde: this.salidas[i].salidaDesde,
              salidaHasta: this.salidas[i].salidaHasta,
              opcion: this.options[j].id,
              tipo: "horario",
            };
            salidas.push(condicionObj);
          }
        }
        body["salidas"] = salidas;

        let incluidos = [];
        if (this.incluidos[0].valor == 0) {
          incluidos = [];
        } else {
          for (let j = 0; j < this.options.length; j++) {
            for (let i = 0; i < this.incluidos.length; i++) {
              let conditionObj = {
                opcion: this.options[j].id,
                cargo: this.incluidos[i].cargo,
                descripcion: this.incluidos[i].descripcion,
                moneda: this.incluidos[i].moneda,
                tipo: "cargo",
                tipoDescuento: this.incluidos[i].tipoDescuento,
                valor: this.incluidos[i].valor,
              };
              incluidos.push(conditionObj);
            }
          }
        }
        body["incluidos"] = incluidos;

        let noIncluidos = [];
        if (this.noIncluidos[0].valor == 0) {
          noIncluidos = [];
        } else {
          for (let j = 0; j < this.options.length; j++) {
            for (let i = 0; i < this.noIncluidos.length; i++) {
              let conditionObj = {
                opcion: this.options[j].id,
                cargo: this.noIncluidos[i].cargo,
                descripcion: this.noIncluidos[i].descripcion,
                moneda: this.noIncluidos[i].moneda,
                tipo: "cargo",
                tipoDescuento: this.noIncluidos[i].tipoDescuento,
                valor: this.noIncluidos[i].valor,
              };
              noIncluidos.push(conditionObj);
            }
          }
        }
        body["noIncluidos"] = noIncluidos;

        let adicionales = [];
        if (this.adicionales[0].descripcion == 0) {
          adicionales = [];
        } else {
          for (let j = 0; j < this.options.length; j++) {
            for (let i = 0; i < this.adicionales.length; i++) {
              let conditionObj = {
                opcion: this.options[j].id,
                tipo: "adicional",
                descripcion: this.adicionales[i].descripcion,
                limite: 1,
              };
              adicionales.push(conditionObj);
            }
          }
        }
        body["adicionales"] = adicionales;
        console.log(body);

        /*         if (this.$route.name == "ConditionsCreate") {
          try {
            data = await service.post(`conditions/crear`, body);
          } catch (e) {
            console.log(e.data);
          }
        } else {
          try {
            data = await service.post(
              `conditions/editar/${this.$route.params.id}`,
              body
            );
          } catch (e) {
            console.log(e.data);
          }
        }
        console.log(data);
        if (this.menuname == "Actividades") {
          this.$router.push({
            name: "ActividadesCalendar",
            params: { id: `${this.$route.params.id}` },
          });
        } else if (this.menuname == "Alojamientos") {
          this.$router.push({
            name: "AlojamientosCalendar",
            params: { id: `${this.$route.params.id}` },
          });
        } else {
          this.$router.push({
            name: "SegurosCalendar",
            params: { id: `${this.$route.params.id}` },
          });
        } */
      }
    },
    shouldDisplayOccup: function (value) {
      return this.selectedOccup === value;
    },
    sumOccupation() {
      this.ocupaciones.numeroPersonas =
        Number(this.ocupacion.maxAdultos) + Number(this.ocupacion.maxNinos);
    },
    addCancellation() {
      this.cancelaciones.push({ dias: "", tipoDescuento: "", valor: "" });
    },
    deleteCancellation(index) {
      this.cancelaciones.splice(index, 1);
    },
    addRateKids() {
      this.tarifas.push({
        edadDesde: "",
        edadHasta: "",
        moneda: "",
        opcion: "",
        tipoDescuento: "",
        valor: "",
      });
    },
    deleteRateKids(index) {
      this.tarifas.splice(index, 1);
    },
    addChargeIncluded() {
      this.incluidos.push({
        cargo: "",
        descripcion: "",
        moneda: "",
        opcion: "",
        tipoDescuento: "",
        valor: "",
      });
    },
    deleteChargeIncluded(index) {
      this.incluidos.splice(index, 1);
    },
    addChargeNoIncluded() {
      this.noIncluidos.push({
        cargo: "",
        descripcion: "",
        moneda: "",
        opcion: "",
        tipoDescuento: "",
        valor: "",
      });
    },
    deleteChargeNoIncluded(index) {
      this.noIncluidos.splice(index, 1);
    },
    addAdditional() {
      this.adicionales.push({ descripcion: "" });
    },
    deleteAdditional(index) {
      this.adicionales.splice(index, 1);
    },
    lower(val) {
      return val.toLowerCase();
    },
    previousPage() {
      this.$router.back();
    },
    linksGeneration(id, name = null) {
      name = name ? name : "";

      this.links = {
        listado: { name: name + "List" },
        detalles: { name: name + "Edit", params: { id: id } },
        opciones: { name: name + "ListOptions", params: { id: id } },
        tarifas: { name: name + "Calendar", params: { id: id } },
        planTarifas: { name: "RatesList", params: { id: id } },
        condiciones: { name: "Conditions", params: { id: id } },
        ofertas: { name: "DealsList", params: { id: id } },
        comentarios: { name: "Review", params: { id: id } },
      };
    },
  },
};
</script>

<style scoped>
.div-content-wrap > .row.fwp > div:last-of-type {
  padding-right: 15px;
  position: relative;
}
.div-content-wrap > .row.fwp > div:last-of-type svg {
  position: absolute;
  right: -7px;
  top: 35px;
  cursor: pointer;
}
.input-add > svg {
  top: 10px;
  position: relative;
  margin-left: 5px;
  cursor: pointer;
}
.preview-title {
  margin-bottom: 15px;
  font-size: 1.25em;
}
.check-in-out__wrap {
  background-color: var(--color-background-light);
  padding: 10px;
  border-radius: 4px;
}
.check-in-out__title {
  margin-bottom: 10px;
}
.check-in-out__wrap > div {
  flex: 1;
}
.info-list {
  padding-left: 50px;
}
.info-list li {
  position: relative;
}
.info-list li:before {
  position: absolute;
  top: 8px;
  content: "";
  height: 0.55em;
  width: 0.55em;
  display: block;
  margin-left: -1.3em;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTMuMDUgMTMuMDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEzLjA1IDEzLjA1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM2NDY0NjQ7IiBjeD0iNi41MjUiIGN5PSI2LjUyNSIgcj0iNi41MjUiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K");
}
.btn__expando-row {
  width: auto;
  cursor: default;
  font-weight: 600;
}
.v-collapse-toggler {
  width: auto;
  display: inline-block;
}
.v-collapse-toggler button {
  cursor: pointer;
}
.v-collapse-toggler:after {
  display: none;
}
.active_collapse .arrow-svg {
  transform: rotate(180deg);
}
.v-collapse-toggler {
  background: transparent;
  padding: 0;
}
.vc-collapse {
  border: none;
  box-shadow: none;
}
.p-0 {
  padding: 0;
}
.brd-0 {
  border: none;
}
.brd-r-0 {
  border-right: none;
}
.brd-l-0 {
  border-left: none;
}
.table-js * {
  box-sizing: border-box;
}
.table-js table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.table-js thead,
.table-js tbody tr {
  display: table;
  width: 100%;
}
.text-left {
  text-align: left;
}
</style>